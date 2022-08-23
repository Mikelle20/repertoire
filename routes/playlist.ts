export {};
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  friendsAccess,
  deletePlaylist,
} = require('../controllers/playlist');

const router = express.Router();

router.post('/createPlaylist', authenticateToken, createPlaylist);
router.get('/getPlaylists', authenticateToken, getPlaylists);
router.post('/getPlaylist', authenticateToken, getPlaylist);
router.post('/friendsAccess', authenticateToken, friendsAccess);
router.delete('/deletePlaylist', authenticateToken, deletePlaylist);

module.exports = router;
