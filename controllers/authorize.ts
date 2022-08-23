/* eslint-disable no-unused-vars */
export {};
const { Request, Response } = require('express');
const nanoid = require('nanoid');
const { Op } = require('sequelize');
const { default: axios } = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const db = require('../models');

const { getAccess, setAccount, generateAccessToken } = require('../helpers/auth');

require('dotenv').config();

interface JwtInterface {
  token: string
  exp: number
  user_id: string
  iat: number
  email: string
}

const registerUser = async (req: typeof Request, res: typeof Response) => {
  try {
    res.json();
    const { email, password } = req.body;
    const emailRegex: RegExp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    const isEmail: boolean = emailRegex.test(email);

    const userFound = await db.User.findOne({ where: { email: { [Op.iLike]: email } } }).catch((error: Error) => console.log(error));

    if (password.length <= 7) return res.status(200).json({ success: false, error: 'Password must be greater than 7 characters.' });
    if (!isEmail) return res.status(200).json({ success: false, error: 'Please enter valid email.' });
    if (userFound) return res.status(200).json({ success: false, error: 'User already associated with email.' });

    const hashedPassword: string = bcrypt.hashSync(password, 10);
    await db.User.create({
      password: hashedPassword,
      email,
      user_id: nanoid(),
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const loginUser = async (req: typeof Request, res: typeof Response) => {
  try {
    const accessCode: string | null = req.body.accessCode || null;
    const { email, password } = req.body;
    const user = await (await db.User.findOne({ where: { email: { [Op.iLike]: email } } }).catch((error: Error) => console.log(error))) || null;
    const hashedPassword: string = user ? user.dataValues.password : '';
    const passwordsMatch: boolean = bcrypt.compareSync(password, hashedPassword);

    if (accessCode) {
      if (!user) return res.status(200).json({ success: false, error: 'Incorrect Username or password.' });
      if (!passwordsMatch) return res.status(200).json({ success: false, error: 'Incorrect Username or password.' });

      await setAccount(accessCode, email);
      const userData = await (await db.User.findOne({ where: { email: { [Op.iLike]: email } } }).catch((error: Error) => console.log(error)));

      const accessToken: string = generateAccessToken({
        display_name: userData.dataValues.display_name,
        profile_image: userData.dataValues.profile_image,
        refresh_token: userData.dataValues.refresh_token,
        spotify_connected: userData.dataValues.spotify_connected,
        email: userData.dataValues.email,
        user_id: userData.dataValues.user_id,
      });

      const decode = jwt.decode(accessToken) as JwtInterface;

      const refreshToken = jwt.sign({
        email: userData.dataValues.email,
        user_id: userData.dataValues.user_id,
      }, process.env.REFRESH_TOKEN_SECRET);

      await db.User.update({ server_refresh_token: refreshToken }, {
        where: { email },
      }).catch((error: Error) => console.log(error));
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
      });

      res.status(200).json({
        success: true,
        accessToken: {
          token: accessToken,
          exp: decode.exp,
        },
      });
    } else {
      if (!user) return res.status(200).json({ success: false, error: 'Incorrect Username or password.' });
      if (!passwordsMatch) return res.status(200).json({ success: false, error: 'Incorrect Username or password.' });

      const accessToken = generateAccessToken({
        display_name: user.dataValues.display_name,
        profile_image: user.dataValues.profile_image,
        refresh_token: user.dataValues.refresh_token,
        spotify_connected: user.dataValues.spotify_connected,
        email: user.dataValues.email,
        user_id: user.dataValues.user_id,
      });

      const decode = jwt.decode(accessToken) as JwtInterface;

      const refreshToken = jwt.sign({
        email: user.dataValues.email,
        user_id: user.dataValues.user_id,
      }, process.env.REFRESH_TOKEN_SECRET);

      await db.User.update({ server_refresh_token: refreshToken }, {
        where: { user_id: user.dataValues.user_id },
      }).catch((error: Error) => console.log(error));
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
      });
      res.status(200).json({
        success: true,
        accessToken: {
          token: accessToken,
          exp: decode.exp,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getUserToken = async (req: typeof Request, res: typeof Response) => {
  try {
    const refreshToken = req.body.token;

    if (!refreshToken) return res.sendStatus(401);

    const decodedToken = jwt.decode(refreshToken) as JwtInterface;

    const userData = await db.User.findOne({
      attributes: ['display_name', 'user_id', 'profile_image', 'email', 'spotify_connected'],
      where: { user_id: decodedToken.user_id },
    }).catch((error: Error) => console.log(error));

    if (!userData) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: Error, user?: any) => {
      if (err) return res.sendStatus(403);

      const accessToken: string = generateAccessToken({
        display_name: userData.dataValues.display_name,
        profile_image: userData.dataValues.profile_image,
        spotify_connected: userData.dataValues.spotify_connected,
        email: userData.dataValues.email,
        user_id: userData.dataValues.user_id,
      });

      const decode = jwt.decode(accessToken) as JwtInterface;

      res.status(200).json({
        success: true,
        user: { ...userData.dataValues },
        accessToken: {
          token: accessToken,
          exp: decode.exp,
        },
      });
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteToken = async (req: typeof Request & { refreshToken: string }, res: typeof Response) => {
  const decodedToken = jwt.decode(req.refreshToken) as JwtInterface;
  try {
    await db.User.update({ server_refresh_token: null }, {
      where: { email: decodedToken.email },
    }).catch((error: Error) => console.log(error));
    res.clearCookie('refreshToken');
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const accountConnected = async (req: typeof Request, res: typeof Response) => {
  try {
    const { check } = req.body || null;
    const { email } = req.body;
    if (check) {
      const user = await (await db.User.findOne({ attributes: ['spotify_connected'], where: { email: { [Op.iLike]: email } } }))?.dataValues;

      if (user.spotify_connected) return res.status(200).json({ success: true });

      if (user.spotify_connected === false) return res.status(200).json({ success: false });
    }

    db.User.update({ spotify_connected: true }, {
      where: { email },
    })
      .then(res.status(200).json({ success: true, accountConnected: true }))
      .catch((error: Error) => console.log(error));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getRefreshToken = async (req: typeof Request, res: typeof Response) => {
  try {
    const { accessCode, email } = req.body;

    const params: string = `grant_type=authorization_code&code=${accessCode}&redirect_uri=${process.env.REDIRECT_URI}`;

    const basicAuth: string = `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`;

    const basicAuthHeaders = {
      Authorization: basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    let refreshToken: string;

    await axios.post('https://accounts.spotify.com/api/token', params, { headers: basicAuthHeaders }).then((resp): void => {
      refreshToken = resp.data.refresh_token;
    }).catch((error: Error) => console.log(error));

    await db.User.update({ refresh_token: refreshToken }, {
      where: { email },
    }).catch((error: Error) => console.log(error));

    const accessToken = await getAccess(refreshToken);

    const bearerAuth = {
      Accept: 'accept/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    // const userInfo = await (await axios.get('https://api.spotify.com/v1/me', { headers: bearerAuth })).data

    axios.get('https://api.spotify.com/v1/me', { headers: bearerAuth }).then((resp) => {
      const userInfo = resp.data;

      if (userInfo.images[0]) {
        db.User.update({
          display_name: userInfo.display_name,
          profile_image: userInfo.images[0].url,
          user_id: userInfo.id,
        }, {
          where: { email },
        });
      } else {
        db.User.update({
          display_name: userInfo.display_name,
          user_id: userInfo.id,
        }, {
          where: { email },
        });
      }
    })
      .then(() => res.status(200).json({ success: true }))
      .catch((error: Error) => console.log(error));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getAccessToken = (req: typeof Request, res: typeof Response): void => {
  try {
    const { refreshToken } = req.body;

    const params = `grant_type=refresh_token&refresh_token=${refreshToken}`;
    const basicAuth = `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`;

    const headers = {
      Authorization: basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: params,
      headers,
    }).then((resp): void => {
      res.json({ success: true, accessToken: resp.data.access_token });
    }).catch((error: Error) => console.log(error));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getUser = async (req: typeof Request, res: typeof Response) => {
  try {
    const server_refresh_token = req.cookies.refreshToken;

    const decodedToken = jwt.decode(server_refresh_token) as JwtInterface;

    const user = await db.User.findOne({
      attributes: ['user_id', 'profile_image'],
      where: { email: decodedToken.email },
    }).catch((error: Error) => console.log(error));

    res.status(200).json({
      success: true,
      user: { ...user.dataValues },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const checkToken = (req: typeof Request & { updatedToken: string }, res: typeof Response) => {
  res.status(200).json({
    accessToken: req.updatedToken,
  });
};

const sendResetLink = async (req: typeof Request, res: typeof Response) => {
  try {
    const { email } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const user = await db.User.findOne({ where: { email: { [Op.iLike]: email } } }).catch((error: Error) => console.log(error));

    if (user) {
      const token = jwt.sign({ email }, process.env.RESET_TOKEN, { expiresIn: '1h' });

      await db.User.update({ reset_token: token }, { where: { email } });

      const msg = {
        to: email,
        from: 'repertoire.manager@gmail.com',
        subject: 'Password Reset Link',
        text: `click here to reset password: https://repertoireapp.herokuapp.com/reset_password/?token=${token}`,
        html: `<strong>click here to reset password: https://repertoireapp.herokuapp.com/reset_password/?token=${token}</strong>`,
      };
      sgMail.send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error: Error) => {
          console.log(error);
        });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const resetPassword = async (req: typeof Request, res: typeof Response) => {
  try {
    const { password, token } = req.body;

    if (password.length <= 7) return res.status(200).json({ success: false, error: 'Password must be greater than 7 characters.' });
    const hashedPassword = bcrypt.hashSync(password, 10);

    jwt.verify(token, process.env.RESET_TOKEN, async (err: Error, user?: any) => {
      if (err) return res.status(200).json({ sucess: false, error: 'Token has expired, please send another email.' });

      await db.User.update({ password: hashedPassword }, { where: { reset_token: token } }).catch((error: Error) => console.log(error));
      await db.User.update({ reset_token: null }, { where: { email: user.email } }).catch((error: Error) => console.log(error));
      res.status(200).json({ success: true });
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getRefreshToken, getAccessToken, deleteToken, loginUser, resetPassword, registerUser, getUser, sendResetLink, getUserToken, accountConnected, checkToken,
};
