const db = require('../models')
const { default: axios } = require('axios')
const { getAccessToken } = require('../helpers/auth')
const sort = require('sort-array')
const { Op } = require('sequelize')

const setHome = async (req, res) => {
  const user = req.user

  try {
    const accessToken = await getAccessToken(user.user_id)

    const userData = await (await db.User.findOne({
      attributes: ['rating', 'display_name', 'profile_image', 'user_id', 'email'],
      where: { user_id: user.user_id }
    })).dataValues

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const suggestions = await db.Suggestion.findAll({
      where: {
        receiver_id: user.user_id
      }
    })

    const playlists = await db.Playlist.findAll({
      where: {
        author_id: user.user_id
      }
    })

    const friendships = await db.Friend.findAll({
      where: {
        status: 'friend',
        [Op.or]: [
          { user_1: user.user_id },
          { user_2: user.user_id }
        ]
      }
    })

    const friends = []
    for (let i = 0; i < friendships.length; i++) {
      if (friendships[i].dataValues.user_1 === user.user_id) {
        friends.push({ friendId: friendships[i].dataValues.user_2 })
      } else {
        friends.push({ friendId: friendships[i].dataValues.user_1 })
      }
    }

    const friendsListens = []

    if (friends.length !== 0) {
      for (let i = 0; i < friends.length; i++) {
        const friendToken = await getAccessToken(friends[i].friendId)

        const friend = await (await db.User.findOne({
          where: { user_id: friends[i].friendId }
        })).dataValues

        const friendHeaders = {
          Authorization: `Bearer ${friendToken}`
        }
        console.log(friend)

        const recentListen = await (await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', { headers: friendHeaders })).data
        friendsListens.push({
          friendName: friend.display_name,
          friendImage: friend.profile_image,
          songName: recentListen.items[0].track.name,
          songImage: recentListen.items[0].track.album.images[0].url,
          playedAt: recentListen.items[0].played_at
        })
      }
    }

    const homeSuggestions = []
    const homePlaylists = []

    if (suggestions.length !== 0) {
      for (let i = 0; i < suggestions.length; i++) {
        const song = await (await axios({
          method: 'GET',
          url: `https://api.spotify.com/v1/tracks/${suggestions[i].dataValues.song_id}`,
          headers
        })).data

        const sender = await (await db.User.findOne({
          where: { user_id: suggestions[i].sender_id }
        })).dataValues

        homeSuggestions.push({
          songId: suggestions[i].dataValues.song_id,
          songImage: song.album.images,
          songName: song.name,
          playlistId: suggestions[i].dataValues.playlist_id,
          senderId: sender.user_id,
          senderImage: sender.profile_image,
          senderName: sender.display_name,
          createdAt: suggestions[i].dataValues.createdAt
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

    const sortedPlaylists = sort(homePlaylists, { order: 'desc', by: 'createdAt' })
    const sortedSuggestions = sort(homeSuggestions, { order: 'desc', by: 'createdAt' })
    const sortedListens = sort(friendsListens, { order: 'desc', by: 'playedAt' })

    res.status(200).json({
      success: true,
      homePlaylists: sortedPlaylists,
      homeSuggestions: sortedSuggestions,
      items: items.items,
      friendListens: sortedListens,
      user: {
        ...userData
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

const getSocials = async (req, res) => {
  const user = req.user

  try {
    const accessToken = await getAccessToken(user.user_id)

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

        const sender = await (await db.User.findOne({
          where: {
            user_id: ratings[i].dataValues.sender_id
          }
        })).dataValues

        socials.push({
          type: 1,
          rating: ratings[i].dataValues.rating,
          senderName: sender.display_name,
          senderImage: sender.profile_image,
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

        const owner = await (await db.User.findOne({
          where: {
            user_id: playlistAdded[i].dataValues.user_id
          }
        })).dataValues

        socials.push({
          playlistOwner: playlistAdded[i].dataValues.user_id,
          ownerName: owner.display_name,
          ownerImage: owner.profile_image,
          playlistName: playlist.name,
          playlistImage: playlist.images
        })
      }
    }
    const sortedSocials = sort(socials, { order: 'desc', by: 'createdAt' })

    res.status(200).send(sortedSocials)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

module.exports = {
  setHome,
  getSocials
}
