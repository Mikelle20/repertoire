const db = require('../models')
const { default: axios } = require('axios')
const { getAccess } = require('../helpers/auth')
const sort = require('sort-array')

const setHome = async (req, res) => {
  const user = req.user
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
    exclude: ['createdAt'],
    where: {
      receiver_id: user.user_id
    }
  })

  const playlists = await db.Playlist.findAll({
    where: {
      author_id: user.user_id
    }
  })

  const homeSuggestions = []
  const homePlaylists = []

  if (suggestions.length !== 0) {
    for (let i = 0; i < suggestions.length; i++) {
      const song = await (await axios({
        method: 'GET',
        url: `https://api.spotify.com/v1/tracks/${suggestions[i].dataValues.song_id}`,
        headers
      })).data

      const sender = await db.User.findOne({
        where: { user_id: suggestions[i].dataValues.sender_id }
      })

      homeSuggestions.push({
        songId: suggestions[i].dataValues.song_id,
        songImage: song.album.images,
        songName: song.name,
        playlistId: suggestions[i].dataValues.playlist_id,
        senderId: sender.dataValues.user_id,
        senderImage: sender.dataValues.profile_image,
        senderName: sender.dataValues.display_name
      })
    }
  }

  if (playlists !== 0) {
    for (let i = 0; i < playlists.length; i++) {
      const playlist = await (await axios({
        method: 'GET',
        url: `https://api.spotify.com/v1/playlists/${playlists[i].dataValues.playlist_id}`,
        headers
      })).data

      homePlaylists.push({
        type: 0,
        playlistId: playlists[i].dataValues.playlist_id,
        playlistImage: playlist.images,
        playlistName: playlist.name,
        createdAt: playlists[i].dataValues.createdAt,
        isPrivate: playlists[i].dataValues.is_private
      })
    }
  }

  const items = await (await axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0',
    headers
  })).data

  res.json({
    homePlaylists,
    homeSuggestions,
    items: items.items
  })
}

const getSocials = async (req, res) => {
  const { user } = req.body
  console.log(req.user, 'hello david')
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

  const socials = []

  const ratings = await db.Rating.findAll({
    where: {
      reciever_id: user.user_id
    }
  })

  if (ratings.length !== 0) {
    for (let i = 0; i < ratings.length; i++) {
      const song = await (await axios({
        method: 'GET',
        url: `https://api.spotify.com/v1/tracks/${ratings[i].dataValues.song_id}`,
        headers
      })).data

      const sender = await db.User.findOne({
        where: {
          user_id: ratings[i].dataValues.sender_id
        }
      })

      socials.push({
        type: 1,
        rating: ratings[i].dataValues.rating,
        senderName: sender.dataValues.display_name,
        senderImage: sender.dataValues.profile_image,
        createdAt: ratings[i].dataValues.createdAt,
        songName: song.name,
        songImage: song.album.images,
        songArtist: song.album.artists[0].name
      })
    }
  }

  const playlistAdded = await db.PlaylistAccess.findAll({
    where: {
      friend_id: user.user_id
    }
  })

  if (playlistAdded.length !== 0) {
    for (let i = 0; i < playlistAdded.length; i++) {
      const playlist = await (await axios({
        method: 'GET',
        url: `https://api.spotify.com/v1/playlists/${playlistAdded[i].dataValues.playlist_id}`,
        headers
      })).data

      const owner = await db.User.findOne({
        where: {
          user_id: playlistAdded[i].dataValues.user_id
        }
      })

      socials.push({
        playlistOwner: playlistAdded[i].dataValues.user_id,
        ownerName: owner.dataValues.display_name,
        ownerImage: owner.dataValues.profile_image,
        playlistName: playlist.name,
        playlistImage: playlist.images
      })
    }
  }

  // socials.sort(function (a, b) {
  //   return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0)
  // })
  const sortedSocials = sort(socials, { order: 'desc', by: 'createdAt' })

  res.send(sortedSocials)
}

module.exports = {
  setHome,
  getSocials
}
