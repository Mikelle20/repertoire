/* eslint-disable camelcase */
require('dotenv').config()
const { default: axios } = require('axios')
const db = require('../models')
const jwt = require('jsonwebtoken')

const getAccess = async (refreshToken) => {
  const accessToken = await axios({
    method: 'POST',
    url: `${process.env.APP_URL}/authorize/access_token`,
    data: { refreshToken }
  }).catch(error => console.log(error))

  return accessToken?.data.accessToken
}

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const getAccessToken = async (user_id) => {
  const url = `${process.env.APP_URL}/authorize/access_token`
  try {
    const refreshToken = await db.User.findOne({
      attributes: ['refresh_token'],
      where: { user_id }
    })

    const accessToken = await (await axios({
      method: 'POST',
      url,
      data: { refreshToken: refreshToken.dataValues.refresh_token }
    }).catch(error => console.log(error)))?.data.accessToken

    return accessToken
  } catch (error) {
    console.log(error.response)
    return error
  }
}

const setAccount = async (accessCode, email) => {
  try {
    const accountSet = await (await axios.post(`${process.env.APP_URL}/authorize/refresh_token`, { accessCode, email }).catch(error => console.log(error)))?.data
    return accountSet
  } catch (error) {
    console.log(error?.response)
  }
}

module.exports = {
  getAccess,
  setAccount,
  getAccessToken,
  generateAccessToken
}
