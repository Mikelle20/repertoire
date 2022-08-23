export {};
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  setHome,
  getSocials,
} = require('../controllers/home');

const router = express.Router();

router.get('/sethome', authenticateToken, setHome);
router.get('/getSocials', authenticateToken, getSocials);

module.exports = router;
