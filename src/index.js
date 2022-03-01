const express = require('express')
const urlMetadata = require("url-metadata");
const checkApiKey = require('./middleware/checkApiKey')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use((err, req, res, _next) => {
    console.error('Error occurs:', err.stack)
    res.status(500).send('Something went wrong')
})

app.get('/api/item/img/:hashName', checkApiKey, async (req, res) => {
    try {
        const {image} = await urlMetadata(`https://steamcommunity.com/market/listings/730/${encodeURI(req.params.hashName)}`)
        res.status(200).send(image.replace('https://community.cloudflare.steamstatic.com/economy/image/', '').replace('/360fx360', ''));
    } catch (e) {
        res.status(500).json(error);
    }
})

const server = app.listen(8080, () => {
    console.log('Server started on PORT:', server.address().port)
})
return server
