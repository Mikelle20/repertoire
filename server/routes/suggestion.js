const express = require('express')
const { search, suggest, getAccessedPlaylists } = require('../controllers/suggestion')
const router = express.Router()

router.post('/search', search)
router.post('/suggest', suggest)
router.post('/accessedPlaylists', getAccessedPlaylists)

module.exports = router
