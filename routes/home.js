const express = require('express')
const { setHome, getSocials } = require('../controllers/home')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

router.get('/sethome', authenticateToken, setHome)
router.get('/getSocials', authenticateToken, getSocials)

module.exports = router
