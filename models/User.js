const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 14
    },
    bestScore: {
        type: Number,
        default: 0
    },
    stats: {
        enemiesKilled: {type: Number, default: 0}
    }
})

module.exports = mongoose.model('User', UserSchema)