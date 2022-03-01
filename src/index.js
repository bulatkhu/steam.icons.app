const express = require('express')
const urlMetadata = require('url-metadata')
const checkApiKey = require('./middleware/checkApiKey')
const rateLimiter = require('./middleware/rateLimiter')
require('dotenv').config()

const PORT = process.env.PORT || 2000

const app = express()
app.use(express.json())
app.use((err, req, res, _next) => {
    console.error('Error occurs:', err.stack)
    res.status(500).send('Something went wrong')
})

app.get('/api/item/img/:hashName', rateLimiter, checkApiKey, async (req, res) => {
    try {
        const {image: url} = await urlMetadata(`https://steamcommunity.com/market/listings/730/${encodeURI(req.params.hashName)}`)

        const iconHash = url.split('/')[5]

        if (iconHash.length < 10) {
            throw 'Invalid item\'s hash'
        }

        res.status(200).json({
            url,
            iconHash
        })
    } catch (e) {
        res.status(500).json({error: e})
    }
})

const server = app.listen(PORT, () => {
    console.log('Server started on PORT:', server.address().port)
})
