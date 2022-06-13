const express = require('express')
const { search, suggest } = require('../controllers/suggestion')
const router = express.Router()

router.post('/search', search)
router.post('suggest', suggest)

module.exports = router
