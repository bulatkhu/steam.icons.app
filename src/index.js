const express = require('express')
const checkApiKey = require('./middleware/checkApiKey')
const rateLimiter = require('./middleware/rateLimiter')
const {handleImage} = require("./controllers/Item");
require('dotenv').config()

const PORT = process.env.PORT || 2000

const app = express()
app.use(express.json())
app.use((err, req, res, _next) => {
    console.error('Error occurs:', err.stack)
    res.status(500).send('Something went wrong')
})

app.get('/api/item/img/:hashName', rateLimiter, checkApiKey, handleImage)

const server = app.listen(PORT, () => {
    console.log('Server started on PORT:', server.address().port)
})
