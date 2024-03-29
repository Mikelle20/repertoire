"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var authenticateToken = require('../middleware/auth').authenticateToken;
var _a = require('../controllers/playlist'), createPlaylist = _a.createPlaylist, getPlaylists = _a.getPlaylists, getPlaylist = _a.getPlaylist, friendsAccess = _a.friendsAccess, deletePlaylist = _a.deletePlaylist;
var router = express.Router();
router.post('/createPlaylist', authenticateToken, createPlaylist);
router.get('/getPlaylists', authenticateToken, getPlaylists);
router.post('/getPlaylist', authenticateToken, getPlaylist);
router.post('/friendsAccess', authenticateToken, friendsAccess);
router.delete('/deletePlaylist', authenticateToken, deletePlaylist);
module.exports = router;
