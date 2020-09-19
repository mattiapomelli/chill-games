const express = require('express')
const userRouter = express.Router()
const User = require('../models/User')

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
                else
                    res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}})
            })
        }
    })
})

userRouter.get('/', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err))
})

module.exports = userRouter