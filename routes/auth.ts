/* eslint-disable no-unused-vars */
export {};
const { Request, Response } = require('express');

const { Op } = require('sequelize');

const express = require('express');
const {
  getRefreshToken, getAccessToken, deleteToken, loginUser, resetPassword, registerUser, getUser, sendResetLink, getUserToken, accountConnected, checkToken,
} = require('../controllers/authorize');
const { authenticateToken, deleteRefreshToken } = require('../middleware/auth');
const db = require('../models');

const router = express.Router();

router.post('/register', registerUser);

router.post('/accountConnected', accountConnected);

router.post('/refresh_token', getRefreshToken);

router.post('/access_token', getAccessToken);

router.get('/getUser', getUser);

router.post('/login', loginUser);

router.post('/userToken', getUserToken);

router.delete('/logout', deleteRefreshToken, deleteToken);

router.get('/checkToken', authenticateToken, checkToken);

router.post('/resetLink', sendResetLink);

router.post('/resetPassword', resetPassword);

router.post('/testing', async (req: typeof Request, res: typeof Response): Promise<any> => {
  const { email } = req.body;
  const user = await (await db.User.findOne({
    where: {
      email: {
        [Op.iLike]: undefined,
      },
    },
  }).catch((error: Error) => console.log(error)))?.dataValues;

  console.log(user);
});

module.exports = router;
