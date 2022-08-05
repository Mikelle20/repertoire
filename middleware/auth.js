require('dotenv').config()
const { default: axios } = require('axios')
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    const { refreshToken } = req.cookies

    console.log(refreshToken)

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({ success: false, error: 'User Not Logged In.' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        if (err.name !== 'TokenExpiredError') {
          return res.sendStatus(403)
        } else {
          try {
            const url = `${process.env.APP_URL}/authorize/userToken`
            const res = await (await axios.post(url, { token: refreshToken })).data
            req.updatedToken = res.accessToken
            req.user = res.user
            console.log('sent new token', true)
            next()
          } catch (error) {
            console.log(error.response)
            return res.sendStatus(400)
          }
        }
      } else {
        req.user = user
        console.log('good access token')
        next()
      }
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const deleteRefreshToken = (req, res, next) => {
  req.refreshToken = req.cookies.refreshToken
  next()
}

module.exports = {
  authenticateToken,
  deleteRefreshToken
}
