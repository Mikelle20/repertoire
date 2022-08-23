"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var authenticateToken = require('../middleware/auth').authenticateToken;
var _a = require('../controllers/home'), setHome = _a.setHome, getSocials = _a.getSocials;
var router = express.Router();
router.get('/sethome', authenticateToken, setHome);
router.get('/getSocials', authenticateToken, getSocials);
module.exports = router;
