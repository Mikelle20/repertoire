/* eslint-disable new-cap */
const { default: axios } = require('axios')
const db = require('../models')
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const { getAccess } = require('../helpers/auth')

require('dotenv').config()

const registerUser = async (req, res) => {
  const { email, password } = req.body
  const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
  const isEmail = emailRegex.test(email)

  db.User.findOne({
    where: { email }
  }).then(async (data) => {
    const userFound = data
    if (password.length > 7) {
      if (isEmail) {
        if (!userFound) {
          const hashedPassword = bcrypt.hashSync(password, 10)
          await db.User.create({
            password: hashedPassword,
            email,
            user_id: nanoid()
          })
          return res.json({ user_created: true })
        } else {
          return res.json({
            userCreated: false,
            errorText: 'User already associated with email.'
          })
        }
      } else {
        return res.json({
          userCreated: false,
          errorText: 'Please enter valid email.'
        })
      }
    } else {
      return res.json({
        userCreated: false,
        errorText: 'Password must greater than 7 characters.'
      })
    }
  })
}

const getRefreshToken = async (req, res) => {
  const { accessCode, email } = req.body

  const params = `grant_type=authorization_code&code=${accessCode}&redirect_uri=${process.env.REDIRECT_URI}`

  const basicAuth = 'Basic ' + new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')

  const basicAuthHeaders = {
    Authorization: basicAuth,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  let refreshToken

  await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: params,
    headers: basicAuthHeaders
  }).then(async (res) => {
    await db.User.update({ refresh_token: res.data.refresh_token }, {
      where: { email },
      returning: true,
      plain: true
    }).then((res) => {
      refreshToken = res[1].dataValues.refresh_token
    })
  })

  const accessToken = await getAccess(refreshToken)

  const bearerAuth = {
    Accept: 'accept/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }

  axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
    headers: bearerAuth
  }).then((res) => {
    if (res.data.images[0]) {
      db.User.update({
        display_name: res.data.display_name,
        profile_image: res.data.images[0].url,
        user_id: res.data.id
      }, {
        where: { email }
      })
    } else {
      db.User.update({
        display_name: res.data.display_name,
        user_id: res.data.id
      }, {
        where: { email }
      })
    }
  })
}

const getAccessToken = (req, res) => {
  const { refreshToken } = req.body

  const params = `grant_type=refresh_token&refresh_token=${refreshToken}`
  const basicAuth = 'Basic ' + new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')

  const headers = {
    Authorization: basicAuth,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: params,
    headers
  }).then(resp => {
    res.json({ accessToken: resp.data.access_token })
  })
}

module.exports = {
  getRefreshToken,
  getAccessToken,
  registerUser
}
