const express = require('express')
const { search, suggest, getAccessedPlaylists, getSuggestions } = require('../controllers/suggestion')
const router = express.Router()

router.post('/search', search)
router.post('/suggest', suggest)
router.post('/accessedPlaylists', getAccessedPlaylists)
router.post('/getSuggestions', getSuggestions)

module.exports = router
