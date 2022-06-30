const express = require('express')
const { createPlaylist } = require('../controllers/playlist')
const router = express.Router()

router.post('/createPlaylist', createPlaylist)

module.exports = router
