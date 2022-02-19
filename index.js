const express = require('express')
// const SteamUser = require('steam-user')
// const csgoCDN = require('csgo-cdn')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use((err, req, res, _next) => {
  console.error('Error occurs:', err.stack)
  res.status(500).send('Something went wrong')
})
// const client = new SteamUser()

const startServer = () => {
  const server = app.listen(4000, () => {
    console.log('Server started on PORT:', server.address().port)
  })
  return server
}

app.get('/api/entry', (req, res) => {
  res.status(200).json({ message: 'hello!' })
})

startServer()

// client.logOn({
//   login: process.env.STEAM_LOGIN,
//   password: process.env.STEAM_PASSWORD
// })
//
// client.on('loggedOn', () => {
//   // client.setPersona(SteamUser.EPersonaState.Online);
//   // client.gamesPlayed(440);
//   const cdn = new csgoCDN(client, { logLevel: 'debug' })
//
//   cdn.on('ready', () => {
//     startServer()
//
//     app.post('/get/icon', (req, res) => {
//       // console.log(cdn.getItemNameURL('StatTrak™ M4A4 | Desert-Strike (Well-Worn)'))
//       // console.log(cdn.getItemNameURL('★ Karambit | Gamma Doppler (Factory New)', cdn.phase.emerald))
//
//       res.json(req.body.map(item => {
//         return cdn.getItemNameURL(item)
//       }))
//     })
//   })
// })

