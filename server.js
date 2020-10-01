const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
require('dotenv').config()

app.use(cookieParser())
app.use(express.json())

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.use('/user', userRouter)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))