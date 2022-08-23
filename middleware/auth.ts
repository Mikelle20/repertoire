import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';

const { default: axios } = require('axios');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const authenticateToken = (req: Request & { user: any, updatedToken: string }, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    const { refreshToken } = req.cookies;

    console.log(refreshToken);

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ success: false, error: 'User Not Logged In.' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        if (err.name !== 'TokenExpiredError') {
          return res.sendStatus(403);
        }
        try {
          const url = `${process.env.APP_URL}/authorize/userToken`;
          let resp;
          await axios.post(url, { token: refreshToken }).then((response: AxiosResponse) => {
            resp = response.data;
          }).catch((error) => console.log(error));
          req.updatedToken = resp.accessToken;
          req.user = resp.user;
          console.log('sent new token', true);
          next();
        } catch (error) {
          console.log(error.response);
          return res.sendStatus(400);
        }
      } else {
        req.user = user;
        console.log('good access token');
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteRefreshToken = (req: Request & { refreshToken: string }, res: Response, next: NextFunction) => {
  req.refreshToken = req.cookies.refreshToken;
  next();
};

module.exports = {
  authenticateToken,
  deleteRefreshToken,
};
