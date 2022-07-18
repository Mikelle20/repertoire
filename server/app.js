const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const auth = require('./routes/auth')
const suggestion = require('./routes/suggestion')
const home = require('./routes/home')
const friends = require('./routes/friends')
const playlist = require('./routes/playlist')
const cors = require('cors')
const { corsOptions } = require('./corsOptions/config')
const session = require('express-session')

require('dotenv').config()

app.use(cors(corsOptions))
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
