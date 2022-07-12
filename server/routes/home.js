const express = require('express')
const { setHome, getSocials } = require('../controllers/home')
const router = express.Router()

router.post('/sethome', setHome)
router.post('/getSocials', getSocials)

module.exports = router
