const express = require('express')
const { setHome } = require('../controllers/home')
const router = express.Router()

router.post('/sethome', setHome)

module.exports = router
