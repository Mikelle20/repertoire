const express = require('express')
const { search, suggest, getAccessedPlaylists, getSuggestions, rate } = require('../controllers/suggestion')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

router.post('/search', authenticateToken, search)
router.post('/suggest', authenticateToken, suggest)
router.post('/accessedPlaylists', authenticateToken, getAccessedPlaylists)
router.post('/getSuggestions', authenticateToken, getSuggestions)
router.post('/rate', authenticateToken, rate)

module.exports = router
