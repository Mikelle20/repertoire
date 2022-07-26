const express = require('express')
const { getRefreshToken, getAccessToken, registerUser, accountConnected, sendResetLink, getUser, loginUser, getUserToken, deleteToken, checkToken } = require('../controllers/authorize')
const router = express.Router()
const { deleteRefreshToken, authenticateToken } = require('../middleware/auth')

router.post('/register', registerUser)

router.post('/accountConnected', accountConnected)

router.post('/refresh_token', getRefreshToken)

router.post('/access_token', getAccessToken)

router.get('/getUser', getUser)

router.post('/login', loginUser)
router.post('/userToken', getUserToken)
router.delete('/logout', deleteRefreshToken, deleteToken)
router.get('/checkToken', authenticateToken, checkToken)
router.post('/resetLink', sendResetLink)

module.exports = router
