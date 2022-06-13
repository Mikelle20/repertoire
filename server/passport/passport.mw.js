/* eslint-disable no-unused-vars */
const db = require('../models')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { default: axios } = require('axios')
const { setAccount } = require('../helpers/auth')
const CustomStrategy = require('passport-custom').Strategy

require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  db.User.findOne({ where: { user_id: user.user_id } }).then(data => {
    done(null, data.dataValues)
  })
})

passport.use(
  new CustomStrategy(
    async function verify (req, done) {
      const accessCode = req.body.accessCode || null
      const { email, password } = req.body
      if (accessCode) {
        db.User.findOne({
          where: { email }
        }).then((user) => {
          try {
            if (user) {
              const hashedPassword = user.dataValues.password
              if (bcrypt.compareSync(password, hashedPassword)) {
                setAccount(accessCode, email)
                done(null, user.dataValues)
              } else {
                done(null, false, { message: 'Incorrect Email or Password' })
              }
            } else {
              done(null, false, { message: 'Incorrect Email or Password' })
            }
          } catch (error) {}
        })
      } else {
        try {
          db.User.findOne({
            where: { email }
          }).then((data) => {
            if (data) {
              const hashedPassword = data.dataValues.password
              if (bcrypt.compareSync(password, hashedPassword)) {
                done(null, data.dataValues)
              } else {
                done(null, false, { message: 'Incorrect email or password' })
              }
            } else {
              console.log('unauthorized')
              done(null, false, { message: 'Incorrect Email or Password' })
            }
          })
        } catch (error) {
          done(error)
        }
      }
    }
  )
)
