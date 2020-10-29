const mongoose = require('mongoose')
const nanoid = require('nanoid')

const shortURLSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: () => nanoid.nanoid(10)
    },
    click: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ShortURL', shortURLSchema)