const { getAccess } = require('../helpers/auth')
const db = require('../models')
const { default: axios } = require('axios')

const createPlaylist = async (req, res) => {
  const { user } = req.body
  const { title, isPrivate, accessList, description } = req.body.formData
  console.log(title, isPrivate, accessList, user)
  let refreshToken

  await db.User.findOne({
    attributes: ['refresh_token'],
    where: { user_id: user.user_id }
  }).then(data => {
    refreshToken = data.dataValues.refresh_token
  })

  const accessToken = await getAccess(refreshToken)
  const url = `https://api.spotify.com/v1/users/${user.user_id}/playlists`

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  }

  axios({
    method: 'POST',
    url,
    headers,
    data: {
      name: title,
      description,
      public: !isPrivate
    }
  })
}

module.exports = {
  createPlaylist
}
