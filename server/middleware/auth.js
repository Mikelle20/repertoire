require('dotenv').config()
const { default: axios } = require('axios')
const jwt = require('jsonwebtoken')

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.status(401).send('Not Logged In')
  }
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  console.log(req.cookies)

  const { refreshToken } = req.cookies

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      if (err.name !== 'TokenExpiredError') {
        return res.sendStatus(403)
      } else {
        try {
          const url = 'http://localhost:5000/authorize/userToken'
          const updatedToken = await (await axios.post(url, { token: refreshToken })).data
          req.updatedToken = updatedToken
          req.user = user
        } catch (error) {
          return res.sendStatus(403)
        }
      }
    }
    req.user = user
    next()
  })
}

module.exports = {
  isLoggedIn,
  authenticateToken
}
