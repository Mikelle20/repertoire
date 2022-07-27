const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const auth = require('./server/routes/auth')
const suggestion = require('./server/routes/suggestion')
const home = require('./server/routes/home')
const friends = require('./server/routes/friends')
const playlist = require('./server/routes/playlist')
const cors = require('cors')
const { corsOptions } = require('./server/corsOptions/config')
const session = require('express-session')
const path = require('path')

require('dotenv').config()

app.use(cors(corsOptions))
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use('/static', express.static(path.join(__dirname, 'client/build')))

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use('/authorize', auth)
app.use('/suggestion', suggestion)
app.use('/home', home)
app.use('/friends', friends)
app.use('/playlist', playlist)

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use('/static', express.static(path.join(__dirname, 'client/public')))

  // Express serve up index.html file if it doesn't recognize route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'public', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
