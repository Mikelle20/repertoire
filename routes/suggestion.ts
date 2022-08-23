export {};
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  search,
  suggest,
  rate,
  getAccessedPlaylists,
  getSuggestions,
} = require('../controllers/suggestion');

const router = express.Router();

router.post('/search', authenticateToken, search);
router.post('/suggest', authenticateToken, suggest);
router.post('/accessedPlaylists', authenticateToken, getAccessedPlaylists);
router.post('/getSuggestions', authenticateToken, getSuggestions);
router.post('/rate', authenticateToken, rate);

module.exports = router;
