const db = require('../models')
const { default: axios } = require('axios')
const { getAccess } = require('../helpers/auth')

const setHome = async (req, res) => {
  const user = req.user
  console.log(user)
  let refreshToken

  await db.User.findOne({
    attributes: ['refresh_token'],
    where: { user_id: user.user_id }
  }).then(data => {
    refreshToken = data.dataValues.refresh_token
  })

  const accessToken = await getAccess(refreshToken)

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  }

  axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0',
    headers
  })
    .then(data => res.json({ items: data.data.items }))
    .catch(err => console.log(err))
}

module.exports = {
  setHome
}
