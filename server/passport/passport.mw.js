/* eslint-disable no-unused-vars */
const db = require('../models')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { default: axios } = require('axios')
const { setAccount } = require('../helpers/auth')
const CustomStrategy = require('passport-custom').Strategy
const LocalStrategy = require('passport-local').Strategy

require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  new CustomStrategy(
    async function (req, done) {
      const accessCode = req.body.accessCode || null
      const { email, password } = req.body
      if (accessCode) {
        db.User.findOne({
          where: { email }
        }).then(async (user) => {
          try {
            if (user) {
              const hashedPassword = user.dataValues.password
              if (bcrypt.compareSync(password, hashedPassword)) {
                await setAccount(accessCode, email)
                db.User.findOne({
                  attributes: ['email', 'user_id', 'profile_image', 'rating', 'spotify_connected', 'display_name'],
                  where: { email }
                }).then((data) => {
                  return done(null, data.dataValues)
                })
              } else {
                return done(null, false, { message: 'Incorrect Email or Password' })
              }
            } else {
              return done(null, false, { message: 'Incorrect Email or Password' })
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
                db.User.findOne({
                  attributes: ['email', 'user_id', 'profile_image', 'rating', 'spotify_connected', 'display_name'],
                  where: { email }
                }).then((data) => {
                  return done(null, data.dataValues)
                })
              } else {
                done(null, false, { message: 'Incorrect Email or Password' })
              }
            } else {
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
