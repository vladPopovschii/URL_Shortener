const mongoose = require('mongoose')
const shortid = require('shortid')

const shortURLSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate
    },
    click: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ShortURL', shortURLSchema)