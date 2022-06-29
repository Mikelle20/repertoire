const express = require('express')
const { addFriend, getFriends } = require('../controllers/friends')
const router = express.Router()

router.post('/addFriend', addFriend)

router.post('/getFriends', getFriends)

module.exports = router
