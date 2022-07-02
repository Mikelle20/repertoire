/* eslint-disable no-unused-vars */
const { default: axios } = require('axios')
const { getAccess } = require('../helpers/auth')
const ratingAvg = require('../helpers/rating')
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
  const user = req.user
  const { reciever, songId, playlistId } = req.body
  db.Suggestion.Create({
    song_id: songId,
    playlist_id: playlistId,
    sender_id: user.user_id,
    reciever_id: reciever
  })

  const refreshToken = await db.User.FindOne({ where: { user_id: reciever } })
  const accessToken = await getAccess(refreshToken)
  const bearer = 'Bearer ' + accessToken

  const headers = {
    Accept: 'application/json',
    Authorization: bearer,
    'Content-Type': 'application/json'
  }

  const endPoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify%3Atrack%3A${songId}`

  axios({
    method: 'POST',
    url: endPoint,
    headers
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

  db.PlaylistAccess.findAll({
    attributes: ['playlist_id'],
    where: {
      user_id: user.user_id,
      friend_id: friend
    }
  })
}
module.exports = {
  search,
  suggest,
  rate
}
