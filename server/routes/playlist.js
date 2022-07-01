const express = require('express')
const { createPlaylist, getPlaylists } = require('../controllers/playlist')
const router = express.Router()

router.post('/createPlaylist', createPlaylist)
router.post('/getPlaylists', getPlaylists)

module.exports = router
