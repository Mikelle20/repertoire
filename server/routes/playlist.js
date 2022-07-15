const express = require('express')
const { createPlaylist, getPlaylists, getPlaylist, friendsAccess } = require('../controllers/playlist')
const router = express.Router()

router.post('/createPlaylist', createPlaylist)
router.post('/getPlaylists', getPlaylists)
router.post('/getPlaylist', getPlaylist)
router.post('/friendsAccess', friendsAccess)

module.exports = router
