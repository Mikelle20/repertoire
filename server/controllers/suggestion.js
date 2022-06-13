/* eslint-disable no-unused-vars */
const { default: axios } = require('axios')
const ratingAvg = require('../helpers/rating')
const getAccess = require('../helpers/auth')
const db = require('../models')

const search = async (req, res) => {
  // let access_token
  // axios({
  //     method:'GET',
  //     url: 'http://localhost:5000/authorize/access_token'
  // }).then(data => access_token = data.access_token)
  const { track } = req.body
  const accessToken = 'BQANe2uVGsPpzPpjKtl1JdcbgOosatl1zajDtqeUHE1wxxnI_eAeEojBB7-BWcYpldvI3MQVKi2unjkjkmBHnss-Tp11n6zttG4lAgZxwKttevnaNHbGsq82gORDsj7UGnew62JN19pcU6JQoEDz8ocDKD59jePOh1HCijRmnYjk--h90lMp126_xn5FqfI8sjTGnOURtwcG1mL1l9vC5qOLUMkwwF9YMOCDs6mfJymbLA'
  const endPoint = 'https://api.spotify.com/v1/search?q='
  const bearer = 'Bearer ' + accessToken
  const headers = {
    Accept: 'application/json',
    Authorization: bearer,
    'Content-Type': 'application/json'

  }

  const response = await axios({
    method: 'GET',
    url: endPoint + `track%3A${track}&type=track&market=ES&limit=20`,
    headers
  })

  const tracks = response.data.tracks.items
  const arr = []
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
module.exports = {
  search,
  suggest,
  rate
}
