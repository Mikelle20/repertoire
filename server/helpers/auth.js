/* eslint-disable camelcase */
require('dotenv').config()
const { default: axios } = require('axios')
const db = require('../models')
const jwt = require('jsonwebtoken')

const getAccess = async (refreshToken) => {
  const accessToken = await axios({
    method: 'POST',
    url: 'http://localhost:5000/authorize/access_token',
    data: { refreshToken }
  })

  return accessToken.data.accessToken
}

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25s' })
}

const getAccessToken = async (user_id) => {
  const url = 'http://localhost:5000/authorize/access_token'
  try {
    const refreshToken = await db.User.findOne({
      attributes: ['refresh_token'],
      where: { user_id }
    })

    const accessToken = await (await axios({
      method: 'POST',
      url,
      data: { refreshToken: refreshToken.dataValues.refresh_token }
    })).data.accessToken

    return accessToken
  } catch (error) {
    return error
  }
}

const setAccount = async (accessCode, email) => {
  let accountSet
  await axios({
    method: 'POST',
    url: 'http://localhost:5000/authorize/refresh_token',
    data: {
      accessCode,
      email
    }
  }).then((res) => {
    accountSet = res.data
  })
  return accountSet
}

module.exports = {
  getAccess,
  setAccount,
  getAccessToken,
  generateAccessToken
}
