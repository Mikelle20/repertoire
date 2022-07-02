/* eslint-disable no-return-assign */
const { getAccess } = require('../helpers/auth')
const db = require('../models')
const { default: axios } = require('axios')
const { setPlaylists } = require('../helpers/playlists')

const createPlaylist = async (req, res) => {
  const { user } = req.body
  const { title, isPrivate, accessList, description } = req.body.formData
  console.log(title, isPrivate, accessList)
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
  }).then(resp => {
    const data = resp.data

    db.Playlist.create({
      playlist_id: data.id,
      title,
      author_id: data.owner.id,
      is_private: isPrivate
    })

    const playlistAcess = accessList.map((element) => {
      return {
        playlist_id: data.id,
        title,
        user_id: user.user_id,
        friend_id: element
      }
    })
    db.PlaylistAccess.bulkCreate(playlistAcess)
  })
}

const getPlaylists = async (req, res) => {
  const { user } = req.body
  let refreshToken

  await db.User.findOne({
    attributes: ['refresh_token'],
    where: { user_id: user.user_id }
  }).then((data) => {
    refreshToken = data.dataValues.refresh_token
  })

  const accessToken = await getAccess(refreshToken)

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  }

  await db.Playlist.findAll({
    attributes: ['playlist_id', 'is_private'],
    where: { author_id: user.user_id }
  }).then(async (resp) => {
    const playlists = await setPlaylists(resp, headers)
    res.send(playlists)
  })
}

module.exports = {
  createPlaylist,
  getPlaylists
}
