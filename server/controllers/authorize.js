/* eslint-disable camelcase */
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

    if (!password.length > 7) return res.status(400).json({ success: false, error: 'Password must be greater than 7 characters.' })
    if (!isEmail) return res.status(400).json({ success: false, error: 'Please enter valid email.' })
    if (userFound) return res.status(400).json({ success: false, error: 'User already associated with email.' })

    const hashedPassword = bcrypt.hashSync(password, 10)
    await db.User.create({
      password: hashedPassword,
      email,
      user_id: nanoid()
    })
    return res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({
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
      // res.setHeader('Cookie', `refreshToken=${refreshToken}; HttpOnly`)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict'
      })
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
  try {
    const refreshToken = req.body.token

    if (!refreshToken) return res.status(401).send('no refresh token')

    const decodedToken = jwt.decode(refreshToken)

    const userData = await (await db.User.findOne({
      attributes: ['display_name', 'user_id', 'profile_image', 'email', 'spotify_connected'],
      where: { user_id: decodedToken.user_id }
    }))

    if (!userData) return res.status(403).send('no user error')

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send('verify refresh error')

      const accessToken = generateAccessToken({
        display_name: userData.dataValues.display_name,
        profile_image: userData.dataValues.profile_image,
        spotify_connected: userData.dataValues.spotify_connected,
        email: userData.dataValues.email,
        user_id: userData.dataValues.user_id
      })

      res.status(200).json({
        success: true,
        user: { ...userData.dataValues },
        accessToken
      })
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

const deleteToken = async (req, res) => {
  try {
    await db.User.update({ server_refresh_token: null }, {
      where: { server_refresh_token: req.refreshToken }
    })
    res.clearCookie('refreshToken')
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

const accountConnected = async (req, res) => {
  try {
    const { check } = req.body || null
    const { email } = req.body
    if (check) {
      const user = await (await db.User.findOne({ attributes: ['spotify_connected'], where: { email } })).dataValues

      if (user.spotify_connected) return res.status(200).json({ success: true })

      if (user.spotify_connected === false) return res.status(200).json({ success: false })
    }

    db.User.update({ spotify_connected: true }, {
      where: { email }
    }).then(res.status(200).json({ success: true, accountConnected: true }))
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

const getRefreshToken = async (req, res) => {
  try {
    const { accessCode, email } = req.body

    const params = `grant_type=authorization_code&code=${accessCode}&redirect_uri=${process.env.REDIRECT_URI}`

    const basicAuth = 'Basic ' + new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')

    const basicAuthHeaders = {
      Authorization: basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const refreshToken = await (await axios.post('https://accounts.spotify.com/api/token', params, { headers: basicAuthHeaders })).data.refresh_token

    await db.User.update({ refresh_token: refreshToken }, {
      where: { email }
    })

    const accessToken = await getAccess(refreshToken)

    const bearerAuth = {
      Accept: 'accept/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const userInfo = await (await axios.get('https://api.spotify.com/v1/me', { headers: bearerAuth })).data

    if (userInfo.images[0]) {
      db.User.update({
        display_name: userInfo.display_name,
        profile_image: userInfo.images[0].url,
        user_id: userInfo.id
      }, {
        where: { email }
      })
    } else {
      db.User.update({
        display_name: userInfo.display_name,
        user_id: userInfo.id
      }, {
        where: { email }
      })
    }

    res.status(200).json({ success: true })
  } catch (error) {
    res.sendStatus(500)
  }
}

const getAccessToken = (req, res) => {
  try {
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
      res.json({ success: true, accessToken: resp.data.access_token })
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

const getUser = async (req, res) => {
  const server_refresh_token = req.cookies.refreshToken

  const decodedToken = jwt.decode(server_refresh_token)

  const user = await (await db.User.findOne({
    attributes: ['user_id', 'profile_image'],
    where: { user_id: decodedToken.user_id }
  }))

  res.status(200).json({
    success: true,
    user: { ...user.dataValues }
  })
}

const checkToken = (req, res) => {
  res.status(200).json({
    accessToken: req.updatedToken
  })
}

module.exports = {
  getRefreshToken,
  getAccessToken,
  deleteToken,
  loginUser,
  registerUser,
  getUser,
  tokenTest,
  getUserToken,
  accountConnected,
  checkToken
}
