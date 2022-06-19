const express = require('express')
const { getRefreshToken, getAccessToken, registerUser, testPassport, accountConnected } = require('../controllers/authorize')
const router = express.Router()
const passport = require('passport')

router.post('/register', registerUser)

router.post('/passport', passport.authenticate('custom'), testPassport)

router.post('/accountConnected', accountConnected)

// router.post('/passport', function (req, res, next) {
//   passport.authenticate('custom', function (err, user, info) {
//     if (err) { return res.send('ERRRROOORRRRR') }
//     if (!user) {
//       res.status(401)
//       res.end('ERROR MESSAGE')
//       return
//     }

//     req.login(user, next)
//   })(req, res, next)
// }, testPassport)

router.post('/refresh_token', getRefreshToken)

router.post('/access_token', getAccessToken)

module.exports = router
