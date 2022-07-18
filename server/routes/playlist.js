const express = require('express')
const { createPlaylist, getPlaylists, getPlaylist, friendsAccess } = require('../controllers/playlist')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

router.post('/createPlaylist', authenticateToken, createPlaylist)
router.get('/getPlaylists', authenticateToken, getPlaylists)
router.post('/getPlaylist', authenticateToken, getPlaylist)
router.post('/friendsAccess', authenticateToken, friendsAccess)

module.exports = router
