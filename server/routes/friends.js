const express = require('express')
const { addFriend, getFriends, searchFriends, deleteFriend } = require('../controllers/friends')
const router = express.Router()

router.post('/addFriend', addFriend)
router.post('/getFriends', getFriends)
router.post('/searchFriends', searchFriends)
router.delete('/deleteFriend', deleteFriend)

module.exports = router
