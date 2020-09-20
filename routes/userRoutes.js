const express = require('express')
const userRouter = express.Router()
const passport = require('passport')
const passportConfig = require('../passport')
const JWT = require('jsonwebtoken')
const User = require('../models/User')

const signToken = userID => {
    return JWT.sign({               //returns tha actual jwt token
        iss: "RandomCoder",
        sub: userID
    }, "RandomCoder", {expiresIn: "1h"})     //"RandomCoder" is the key that we wanna sing with
}

userRouter.post('/register', (req, res) => {
    const {username, bestScore} = req.body
    User.findOne({username}, (err, user) => {
        if(err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
        if(user)
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}})
        else {
            const newUser = new User({username, bestScore})
            newUser.save(err => {
                if(err)
                    res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
                else {
                    const {_id} = newUser
                    const token = signToken(_id)
                    res.cookie('access_token', token, {httpOnly: true, sameSite: true})
                    res.status(200).json({isAuthenticated: true, loggedUser: {username, _id}})
                    //res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}})
                }
            })
        }
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

userRouter.get('/', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err))
})

//update user's best score
userRouter.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findByIdAndUpdate(req.params.id, {bestScore: req.body.score}, (err, user) => {
        if(err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
        if(!user)
            return res.status(400).json({message: {msgBody: "User not found", msgError: true}})

        return res.status(200).json({message: {msgBody: "Best score updated", msgError: false}})
    })
})

module.exports = userRouter