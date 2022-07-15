const { default: axios } = require('axios')
const db = require('../models')

const stripPlaylists = async (arr, headers) => {
  const playlists = []

  for (const element of arr) {
    const url = `https://api.spotify.com/v1/playlists/${element.dataValues.playlist_id}`
    const playlist = await (await axios.get(url, { headers })).data

    if (playlist.error) {
      db.Playlist.destroy({
        where: { playlist_id: element.dataValues.playlist_id }
      })
    } else {
      playlists.push({
        images: playlist.images,
        name: playlist.name,
        playlistId: playlist.id,
        checked: false
      })
    }
  }
  return playlists
}

module.exports = {
  stripPlaylists
}
