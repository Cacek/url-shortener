const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema(
    {
        longUrl: String,

        hash: String,

        date: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model('Url', URLSchema)
