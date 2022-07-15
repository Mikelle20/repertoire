const express = require('express')
const { getRefreshToken, getAccessToken, registerUser, testPassport, accountConnected, getUser, loginUser, tokenTest, getUserToken, deleteToken } = require('../controllers/authorize')
const router = express.Router()
const passport = require('passport')
const { authenticateToken } = require('../middleware/auth')

router.post('/register', registerUser)

router.post('/passport', passport.authenticate('custom'), testPassport)

router.post('/accountConnected', accountConnected)

router.post('/refresh_token', getRefreshToken)

router.post('/access_token', getAccessToken)

router.post('/getUser', getUser)

router.post('/login', loginUser)
router.get('/tokenTest', authenticateToken, tokenTest)
router.post('/userToken', getUserToken)
router.delete('/logout', deleteToken)

module.exports = router
