const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 14
    },
    password: {
        type: String,
        required: true
    },
    zombiegame: {
        bestScore: {
            type: Number,
            default: 0
        },
        stats: {
            timesPlayed: {type: Number, default: 0},
            enemiesKilled: {type: Number, default: 0},
            bulletsShot: {type: Number, default: 0},
        }
    },
    cargame: {
        bestScore: {
            type: Number,
            default: 0
        },
        stats: {
            timesPlayed: {type: Number, default: 0},
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)