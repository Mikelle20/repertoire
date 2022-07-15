/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { default: axios } = require('axios')
const { getAccess, getAccessToken } = require('../helpers/auth')
const ratingAvg = require('../helpers/rating')
const { stripPlaylists } = require('../helpers/suggestion')
const db = require('../models')

const search = async (req, res) => {
  try {
    const { search, user } = req.body
    const arr = []

    const accessToken = await getAccessToken(user.user_id)

    const endPoint = 'https://api.spotify.com/v1/search?q='
    const bearer = 'Bearer ' + accessToken
    const headers = {
      Accept: 'application/json',
      Authorization: bearer,
      'Content-Type': 'application/json'
    }

    const url = endPoint + `track%3A${search}&type=track&market=ES&limit=10`

    const tracks = await (await axios.get(url, { headers })).data.tracks.items

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

    res.status(200).json(arr)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: 'Something went wrong server side.'
    })
  }
}

const suggest = async (req, res) => {
  const { friend_id, song_id, playlist_id } = req.body.formData
  const { user } = req.body

  try {
    await db.Suggestion.create({
      song_id,
      playlist_id,
      sender_id: user.user_id,
      receiver_id: friend_id
    })

    const accessToken = await getAccessToken(friend_id)

    const bearer = 'Bearer ' + accessToken

    const headers = {
      Accept: 'application/json',
      Authorization: bearer,
      'Content-Type': 'application/json'
    }

    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=spotify%3Atrack%3A${song_id}`

    await axios.post(url, null, { headers })

    res.status(200).json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: 'Something went wrong server side.'
    })

    db.Suggestion.destroy({
      where: {
        song_id,
        playlist_id,
        sender_id: user.user_id,
        receiver_id: friend_id
      }
    })
  }
}

const rate = async (req, res) => {
  const { user, rating, receiverId, songId, playlistId } = req.body

  try {
    const ratingExist = await db.Rating.findOne({
      where: {
        sender_id: user.user_id,
        reciever_id: receiverId,
        playlist_id: playlistId,
        song_id: songId
      }
    })

    if (ratingExist) {
      await db.Rating.update({
        rating
      }, {
        where: {
          sender_id: user.user_id,
          reciever_id: receiverId,
          playlist_id: playlistId,
          song_id: songId
        }
      })
    } else {
      await db.Rating.create({
        sender_id: user.user_id,
        reciever_id: receiverId,
        song_id: songId,
        playlist_id: playlistId,
        rating
      })
    }

    const ratings = await db.Rating.findAll({
      where: {
        reciever_id: receiverId
      },
      attributes: ['rating']
    })

    const ratingSum = ratings.reduce((accumulator, object) => {
      return accumulator + object.rating
    }, 0)

    const newRating = ratingAvg(ratingSum, ratings.length)

    await db.User.update({ rating: newRating }, {
      where: { user_id: receiverId }
    })

    res.status(200).json({
      success: true
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong server side.'
    })
  }
}

const getAccessedPlaylists = async (req, res) => {
  const { user, friend } = req.body
  let playlistsAccessed = []

  try {
    const accessToken = await getAccessToken(friend)

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    await db.PlaylistAccess.findAll({
      attributes: ['playlist_id'],
      where: {
        user_id: friend,
        friend_id: user.user_id
      }
    }).then(async (resp) => {
      playlistsAccessed = await stripPlaylists(resp, headers)
    })

    await db.Playlist.findAll({
      attributes: ['playlist_id'],
      where: {
        author_id: friend,
        is_private: false
      }
    }).then(async (resp) => {
      const otherPlaylists = await stripPlaylists(resp, headers)
      playlistsAccessed = [...playlistsAccessed, ...otherPlaylists]
    })

    res.status(200).send(playlistsAccessed)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong server side.'
    })
  }
}

const getSuggestions = async (req, res) => {
  const { user, playlistId } = req.body
  const arr = []

  try {
    const accessToken = await getAccessToken(user.user_id)

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

      const rating = await db.Rating.findOne({
        attributes: ['rating'],
        where: {
          playlist_id: playlistId,
          song_id: suggestions[i].dataValues.song_id,
          sender_id: user.user_id,
          reciever_id: suggestions[i].dataValues.sender_id
        }
      })

      arr.push({
        songId: suggestions[i].dataValues.song_id,
        senderId: suggestions[i].dataValues.sender_id,
        senderImage: sender.dataValues.profile_image,
        senderName: sender.dataValues.display_name,
        songName: song.name,
        songImage: song.album.images[0].url,
        rating: rating ? rating.dataValues.rating : 0
      })
    }

    res.status(200).send(arr)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong server side.'
    })
  }
}

module.exports = {
  search,
  suggest,
  rate,
  getAccessedPlaylists,
  getSuggestions
}
