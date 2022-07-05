const express = require('express')
const { addFriend, getFriends, searchFriends } = require('../controllers/friends')
const router = express.Router()

router.post('/addFriend', addFriend)
router.post('/getFriends', getFriends)
router.post('/searchFriends', searchFriends)

module.exports = router
