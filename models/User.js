const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 14
    },
    zombiegame: {
        bestScore: {
            type: Number,
            default: 0
        },
        stats: {
            enemiesKilled: {type: Number, default: 0},
            zombiesKilled: {type: Number, default: 0},
            wolvesKilled: {type: Number, default: 0},
        }
    },
    cargame: {
        bestScore: {
            type: Number,
            default: 0
        },
        stats: {
            obstaclesHit: {type: Number, default: 0},
            gasCollected: {type: Number, default: 0},
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)