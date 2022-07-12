const express = require('express')
const { search, suggest, getAccessedPlaylists, getSuggestions, rate, getRatings } = require('../controllers/suggestion')
const router = express.Router()

router.post('/search', search)
router.post('/suggest', suggest)
router.post('/accessedPlaylists', getAccessedPlaylists)
router.post('/getSuggestions', getSuggestions)
router.post('/rate', rate)
router.post('/getRatings', getRatings)

module.exports = router
