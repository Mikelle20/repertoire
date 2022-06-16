const express = require('express')
const { getRefreshToken, getAccessToken, registerUser, testPassport } = require('../controllers/authorize')
const router = express.Router()
const passport = require('passport')

router.post('/register', registerUser)

router.post('/passport', passport.authenticate('custom'), testPassport)

router.post('/refresh_token', getRefreshToken)

router.post('/access_token', getAccessToken)

module.exports = router
