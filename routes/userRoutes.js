const express = require('express')
const userRouter = express.Router()
const passport = require('passport')
const passportConfig = require('../passport')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const User = require('../models/User')

const validateRegisterInput = require("../validation/registerValidation");
const validateLoginInput = require("../validation/loginValidation");

const signToken = userID => {
    return JWT.sign({               //returns tha actual jwt token
        iss: "RandomCoder",
        sub: userID
    }, "RandomCoder", {expiresIn: "14d"})     //"RandomCoder" is the key that we wanna sing with
}

userRouter.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {username, password, bestScore, stats, game} = req.body
    User.findOne({username}, (err, user) => {
        if(err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
        if(user)
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}})
        else {

            let schema = {}
            schema[game] = {bestScore, stats}
            schema["username"] = username
            //schema["password"] = password

            const newUser = new User(schema)

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, passwordHash) => {
                    if(err)
                        throw err
                    newUser.password = passwordHash
                    newUser.save(err => {
                        if(err)
                            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
                        else {
                            const {_id, username, bestScore} = newUser
                            const token = signToken(_id)
                            res.cookie('access_token', token, {httpOnly: true, sameSite: true})
                            res.status(200).json({isAuthenticated: true, loggedUser: {username, _id}})
                            //res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}})
                        }
                    })
                })
            })
        }
    })
})

userRouter.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    //console.log(errors)
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { username, password } = req.body
    User.findOne({username}, (err, user) => {   //we look for the user
        //  something went wrong with database
        if(err)          
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
        // if no user exists
        if(!user)
            return res.status(400).json({message: {msgBody: "User not found", msgError: true}})
        // check if password is correct 
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(isMatch) {
                const {_id, username, bestScore} = user
                const token = signToken(_id)
                res.cookie('access_token', token, {httpOnly: true, sameSite: true})
                res.status(200).json({isAuthenticated: true, loggedUser: {username, _id, bestScore}})
            } else {
                return res.status(400).json({message: {msgBody: "Password incorrect", msgError: true}})
            }
        })
    })
})

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');            //we remove the jwt token so the user has to sign in again if he wants to access protected routes
    res.json({user:{username : "", role : ""},success : true});
})

//make sure our backend and our frontend is synched in, so that even if the user closes and visits the website again he'll still be logged in if he was authenticated
userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}),(req, res)=> {  
    const {username, _id, bestScore} = req.user
    res.status(200).json({isAuthenticated: true, loggedUser: {username, _id, bestScore}})
})

// get users sorted by best score for a specific game
userRouter.get('/rank/:game', (req, res) => {

    let {game} = req.params

    User.aggregate([
        { "$project": {
            "username": 1,
            "score": `$${game}.bestScore`
        }},
        { "$sort": {"score": -1}}
    ])
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err))
})

//update user's best score and stats
userRouter.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {_id} = req.user //user who made the request

    if(_id.toString() === req.params.id.toString()) {   // verify that the user making the request is updating his own profile
        let {game, score, stats} = req.body

        let statsUpdate = {}
        for (const [key, value] of Object.entries(stats)) {
            statsUpdate[`${game}.stats.${key}`] = value
        }
    
        let scoreUpdate = {}
        scoreUpdate[`${game}.bestScore`] = score
    
        User.findByIdAndUpdate(req.params.id, {
            $max: scoreUpdate,
            $inc: statsUpdate
        }, //to return the updated document and not the original one
        (err, user) => {
            if(err)
                res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
            if(!user)
                return res.status(400).json({message: {msgBody: "User not found", msgError: true}})
    
            let message = score > user[game].bestScore ? "New record!" : ""

            return res.status(200).json({message: {msgBody: message, msgError: false}})
        })
    } else {
        return res.status(400).json({message: {msgBody: "You are trying to update someone else's profile", msgError: true}})
    }
})

userRouter.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
        if(!user)    //that means the username already exists
            return res.status(400).json({message: {msgBody: "User not found", msgError: true}})

        return res.status(200).json(user)
    })
})


module.exports = userRouter