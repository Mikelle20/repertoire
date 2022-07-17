const express = require('express')
const { addFriend, getFriends, searchFriends, deleteFriend } = require('../controllers/friends')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

router.post('/addFriend', authenticateToken, addFriend)
router.post('/getFriends', getFriends)
router.post('/searchFriends', authenticateToken, searchFriends)
router.delete('/deleteFriend', authenticateToken, deleteFriend)

module.exports = router
