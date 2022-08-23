export {};
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  addFriend,
  getFriends,
  searchFriends,
  deleteFriend,
} = require('../controllers/friends');

const router = express.Router();

router.post('/addFriend', authenticateToken, addFriend);
router.get('/getFriends', authenticateToken, getFriends);
router.post('/searchFriends', authenticateToken, searchFriends);
router.delete('/deleteFriend', authenticateToken, deleteFriend);

module.exports = router;
