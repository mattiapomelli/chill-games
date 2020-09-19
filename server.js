const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')

app.use(express.json())

mongoose
    .connect('mongodb+srv://mattiapomelli:25163540@zombie-game-v2.wqiz8.mongodb.net/maindb?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.use('/user', userRouter)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))