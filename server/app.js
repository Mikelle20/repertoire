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
const passport = require('passport')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./models')

require('dotenv').config()
require('./passport/passport.mw.js')

app.use(cors(corsOptions))
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const store = new SequelizeStore({ db: db.sequelize })

app.use(session({
  secret: 'secret',
  resave: true,
  store,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

store.sync()

app.use(passport.initialize())
app.use(passport.session())

app.use('/authorize', auth)
app.use('/suggestion', suggestion)
app.use('/home', home)
app.use('/friends', friends)
app.use('/playlist', playlist)

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect('/')
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
