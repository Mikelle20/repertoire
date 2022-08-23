/* eslint-disable camelcase */
export {};
const { AxiosResponse } = require('axios');
const { default: axios } = require('axios');
const jwt = require('jsonwebtoken');
const db = require('../models');

require('dotenv').config();

const getAccess = async (refreshToken: string): Promise<string> => {
  let accessToken: string;
  await axios({
    method: 'POST',
    url: `${process.env.APP_URL}/authorize/access_token`,
    data: { refreshToken },
  }).then((res) => {
    accessToken = res.data.accessToken;
  }).catch((error: Error) => console.log(error));

  return accessToken;
};

const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

const getAccessToken = async (user_id: string): Promise<any> => {
  const url = `${process.env.APP_URL}/authorize/access_token`;
  try {
    const refreshToken = await db.User.findOne({
      attributes: ['refresh_token'],
      where: { user_id },
    });

    let accessToken: string;
    await axios({
      method: 'POST',
      url,
      data: { refreshToken: refreshToken.dataValues.refresh_token },
    }).then((res: typeof AxiosResponse) => {
      accessToken = res.data.accessToken;
    }).catch((error: Error) => console.log(error));

    return accessToken;
  } catch (error) {
    console.log(error.response);
    return error;
  }
};

const setAccount = async (accessCode: string, email: string): Promise<any> => {
  try {
    await axios.post(`${process.env.APP_URL}/authorize/refresh_token`, { accessCode, email }).then((res) => res.data).catch((error: Error) => console.log(error));
  } catch (error) {
    console.log(error?.response);
  }
};

module.exports = {
  getAccess,
  setAccount,
  getAccessToken,
  generateAccessToken,
};
