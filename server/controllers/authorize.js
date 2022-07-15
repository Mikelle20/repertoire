/* eslint-disable new-cap */
const { default: axios } = require('axios')
const db = require('../models')
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const { getAccess, setAccount, generateAccessToken } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
    const isEmail = emailRegex.test(email)

    const userFound = await db.User.findOne({ where: { email } })

    if (password.length > 7) {
      if (isEmail) {
        if (!userFound) {
          const hashedPassword = bcrypt.hashSync(password, 10)
          await db.User.create({
            password: hashedPassword,
            email,
            user_id: nanoid()
          })
          return res.status(200).json({ success: true, userCreated: true })
        } else {
          return res.status(200).json({
            success: true,
            userCreated: false,
            errorText: 'User already associated with email.'
          })
        }
      } else {
        return res.status(200).json({
          success: true,
          userCreated: false,
          errorText: 'Please enter valid email.'
        })
      }
    } else {
      return res.status(200).json({
        success: true,
        userCreated: false,
        errorText: 'Password must greater than 7 characters.'
      })
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      error: 'Something went wrong on the server side.status(200).'
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const accessCode = req.body.accessCode || null
    const { email, password } = req.body
    const user = await (await db.User.findOne({ where: { email } })) || null
    const hashedPassword = user ? user.dataValues.password : ''
    const passwordsMatch = bcrypt.compareSync(password, hashedPassword)

    if (accessCode) {
      if (!user) return res.status(403).json({ success: false, error: 'Incorrect Username or password.' })
      if (!passwordsMatch) return res.status(403).json({ success: false, error: 'Incorrect Username or password.' })

      await setAccount(accessCode, email)
      const accessToken = generateAccessToken({
        display_name: user.dataValues.display_name,
        profile_image: user.dataValues.profile_image,
        refresh_token: user.dataValues.refresh_token,
        spotify_connected: user.dataValues.spotify_connected,
        email: user.dataValues.email,
        user_id: user.dataValues.user_id
      })

      const refreshToken = jwt.sign({
        email: user.dataValues.email,
        user_id: user.dataValues.user_id
      }, process.env.REFRESH_TOKEN_SECRET)

      await db.User.update({ server_refresh_token: refreshToken }, {
        where: { user_id: user.dataValues.user_id }
      })

      res.status(200).json({
        success: true,
        accessToken
      })
    } else {
      if (!user) return res.status(403).json({ success: false, error: 'Incorrect Username or password.' })
      if (!passwordsMatch) return res.status(403).json({ success: false, error: 'Incorrect Username or password.' })

      const accessToken = generateAccessToken({
        display_name: user.dataValues.display_name,
        profile_image: user.dataValues.profile_image,
        refresh_token: user.dataValues.refresh_token,
        spotify_connected: user.dataValues.spotify_connected,
        email: user.dataValues.email,
        user_id: user.dataValues.user_id
      })

      const refreshToken = jwt.sign({
        email: user.dataValues.email,
        user_id: user.dataValues.user_id
      }, process.env.REFRESH_TOKEN_SECRET)

      await db.User.update({ server_refresh_token: refreshToken }, {
        where: { user_id: user.dataValues.user_id }
      })
      res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly`)
      res.status(200).json({
        success: true,
        accessToken
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

const getUserToken = async (req, res) => {
  const refreshToken = req.body.token

  console.log(req.body)

  if (!refreshToken) return res.sendStatus(401)

  const userData = await db.User.findOne({
    where: { server_refresh_token: refreshToken }
  })

  if (!userData) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    const accessToken = generateAccessToken({
      display_name: userData.dataValues.display_name,
      profile_image: userData.dataValues.profile_image,
      spotify_connected: userData.dataValues.spotify_connected,
      email: userData.dataValues.email,
      user_id: userData.dataValues.user_id
    })

    res.status(200).json({
      success: true,
      accessToken
    })
  })
}

const deleteToken = async (req, res) => {
  try {
    await db.User.update({ server_refresh_token: null }, {
      where: { server_refresh_token: req.body.token }
    })

    res.status(200).json({
      success: true
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

const tokenTest = (req, res) => {
  res.send(req.user)
}

const testPassport = (req, res) => {
  if (req.user) {
    console.log(req.user)
    return res.json(req.user)
  } else {
    return res.json({
      errorText: 'Incorrect'
    })
  }
}

const accountConnected = (req, res) => {
  const { email } = req.body
  db.User.update({ spotify_connected: true }, {
    where: { email }
  }).then(res.json({ accountConnected: true }))
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

  await axios({
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

  res.json(true)
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

const getUser = async (req, res) => {
  const { email } = req.body
  const user = await db.User.findOne({
    attributes: ['display_name', 'profile_image', 'user_id', 'rating', 'email', 'spotify_connected'],
    where: { email }
  })

  res.send(user.dataValues)
}

module.exports = {
  getRefreshToken,
  getAccessToken,
  deleteToken,
  loginUser,
  registerUser,
  getUser,
  testPassport,
  tokenTest,
  getUserToken,
  accountConnected
}
