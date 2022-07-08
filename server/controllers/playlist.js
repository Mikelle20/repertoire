/* eslint-disable no-return-assign */
const { getAccess } = require('../helpers/auth')
const db = require('../models')
const { default: axios } = require('axios')
const { setPlaylists } = require('../helpers/playlists')
const { Op } = require('sequelize')

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

const getPlaylist = async (req, res) => {
  const { playlistId, user } = req.body

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

  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/playlists/${playlistId}`,
    headers
  }).then(resp => {
    const { description, followers, images, name } = resp.data
    const { items } = resp.data.tracks
    res.json({
      description,
      followers,
      images,
      name,
      items
    })
  })
}

const friendsAccess = async (req, res) => {
  const { user, playlistInfo } = req.body

  if (playlistInfo.isPrivate) {
    const users = await db.PlaylistAccess.findAll({
      attributes: ['friend_id'],
      where: {
        [Op.and]: [
          { user_id: user.user_id },
          { playlist_id: playlistInfo.playlistId }
        ]
      }
    })

    const arr = []
    users.forEach(element => {
      arr.push({ user_id: element.dataValues.friend_id })
    })

    db.User.findAll({
      attributes: ['user_id', 'profile_image', 'rating', 'email', 'display_name'],
      where: {
        [Op.or]: arr
      }
    }).then(resp => {
      const friends = []
      for (let i = 0; i < resp.length; i++) {
        friends.push({
          ...resp[i].dataValues
        })
      }
      console.log(friends)
    })
    // console.log(users)
  } else {
    const users = await db.Friend.findAll({
      where: {
        [Op.or]: [
          { user_1: user.user_id },
          { user_2: user.user_id }
        ]
      }
    })
    const arr = []
    users.forEach(element => {
      if (element.dataValues.user_2 === user.user_id) {
        arr.push({ user_id: element.dataValues.user_1 })
      } else {
        arr.push({ user_id: element.dataValues.user_2 })
      }
    })

    db.User.findAll({
      attributes: ['user_id', 'profile_image', 'rating', 'email', 'display_name'],
      where: {
        [Op.or]: arr
      }
    }).then(resp => {
      const friends = []
      for (let i = 0; i < resp.length; i++) {
        friends.push({
          ...resp[i].dataValues
        })
      }
      console.log(friends)
    })
    // console.log(users)
  }
}

module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  friendsAccess
}
