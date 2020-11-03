if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const ShortURL = require('./models/shortURL')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/', async (req, res) => {
    const shortURLs = await ShortURL.find()
    res.render('index', { shortURLs: shortURLs})
})

app.post('/shortURLs', async (req, res) => {
    await ShortURL.create({ full: req.body.fullURL })
    res.redirect('/')
})

app.get('/:shortURL', async (req, res) => {
    const shortURL = await ShortURL.findOne({ short: req.params.shortURL })
    if (shortURL == null) return res.sendStatus(404)

    shortURL.click++
    shortURL.save()

    res.redirect(shortURL.full)
})

app.listen(process.env.PORT || 3000)