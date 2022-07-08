/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { default: axios } = require('axios')
const { getAccess } = require('../helpers/auth')
const ratingAvg = require('../helpers/rating')
const { stripPlaylists } = require('../helpers/suggestion')
const db = require('../models')

const search = async (req, res) => {
  const { search, user } = req.body
  let refreshToken
  const arr = []

  await db.User.findOne({
    attributes: ['refresh_token'],
    where: { user_id: user.user_id }
  }).then(data => {
    refreshToken = data.dataValues.refresh_token
  })

  const accessToken = await getAccess(refreshToken)
  const endPoint = 'https://api.spotify.com/v1/search?q='
  const bearer = 'Bearer ' + accessToken
  const headers = {
    Accept: 'application/json',
    Authorization: bearer,
    'Content-Type': 'application/json'
  }

  await axios({
    method: 'GET',
    url: endPoint + `track%3A${search}&type=track&market=ES&limit=10`,
    headers
  }).then((resp) => {
    const tracks = resp.data.tracks.items

    for (const element of tracks) {
      const track = {
        title: element.name,
        cover: element.album.images[0].url,
        artist: element.artists[0].name,
        explicit: element.explicit,
        songId: element.id
      }
      arr.push(track)
    }
  })

  res.json(arr)
}

const suggest = async (req, res) => {
  const { friend_id, song_id, playlist_id } = req.body.formData
  const { user } = req.body

  await db.Suggestion.create({
    song_id,
    playlist_id,
    sender_id: user.user_id,
    receiver_id: friend_id
  })

  let refreshToken

  await db.User.findOne({
    attributes: ['refresh_token'],
    where: {
      user_id: friend_id
    }
  }).then(resp => {
    refreshToken = resp.dataValues.refresh_token
    console.log(refreshToken)
  })
  const accessToken = await getAccess(refreshToken)
  const bearer = 'Bearer ' + accessToken

  const headers = {
    Accept: 'application/json',
    Authorization: bearer,
    'Content-Type': 'application/json'
  }

  const endPoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=spotify%3Atrack%3A${song_id}`

  axios({
    method: 'POST',
    url: endPoint,
    headers
  }).then(resp => {
    res.send('track added')
  })
}

const rate = async (req, res) => {
  const { user, rating, recieverId } = req
  await db.Rating.create({
    sender_id: user.user_id,
    reciever_id: recieverId,
    rating
  })

  const ratings = await db.Rating.findAll({
    where: {
      reciever_id: recieverId
    },
    attributes: 'rating'
  })

  const ratingsCorrected = JSON.stringify(ratings, null, 2)

  let ratingSum = 0

  for (const rating in ratingsCorrected) {
    ratingSum += rating.rating
  }

  const { totalRatings, rows } = await db.Rating.findAndCountAll({
    where: {
      reciever_id: recieverId
    }
  })

  const newRating = ratingAvg(ratingSum, totalRatings)

  await db.User.update({ rating: newRating }, {
    where: { user_id: recieverId }
  })
}

const getAccessedPlaylists = async (req, res) => {
  const { user, friend } = req.body
  let playlistsAccessed = []
  let refreshToken

  await db.User.findOne({
    attributes: ['refresh_token'],
    where: { user_id: friend }
  }).then(data => {
    refreshToken = data.dataValues.refresh_token
  })

  const accessToken = await getAccess(refreshToken)

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  }

  await db.PlaylistAccess.findAll({
    attributes: ['playlist_id', 'title'],
    where: {
      user_id: friend,
      friend_id: user.user_id
    }
  }).then(async (resp) => {
    playlistsAccessed = await stripPlaylists(resp, headers)
  })

  await db.Playlist.findAll({
    attributes: ['playlist_id', 'title'],
    where: {
      author_id: friend,
      is_private: false
    }
  }).then(async (resp) => {
    const otherPlaylists = await stripPlaylists(resp, headers)
    playlistsAccessed = [...playlistsAccessed, ...otherPlaylists]
  })

  res.send(playlistsAccessed)
}

const getSuggestions = async (req, res) => {
  const { user, playlistId } = req.body

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

  const suggestions = await db.Suggestion.findAll({
    attributes: ['song_id', 'sender_id'],
    where: {
      playlist_id: playlistId,
      receiver_id: user.user_id
    }
  })

  const arr = []

  for (let i = 0; i < suggestions.length; i++) {
    const sender = await db.User.findOne({
      attributes: ['display_name', 'profile_image'],
      where: {
        user_id: suggestions[i].dataValues.sender_id
      }
    })

    const song = await (await axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/tracks/${suggestions[i].dataValues.song_id}`,
      headers
    })).data

    arr.push({
      songId: suggestions[i].dataValues.song_id,
      senderId: suggestions[i].dataValues.sender_id,
      senderImage: sender.dataValues.profile_image,
      senderName: sender.dataValues.display_name,
      songName: song.name,
      songImage: song.album.images[0].url
    })
  }

  res.send(arr)
}

module.exports = {
  search,
  suggest,
  rate,
  getAccessedPlaylists,
  getSuggestions
}
