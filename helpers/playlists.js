const { default: axios } = require('axios')
const db = require('../models')

const setPlaylists = async (playlists, headers) => {
  const arr = []
  for (const element of playlists) {
    const url = `https://api.spotify.com/v1/playlists/${element.dataValues.playlist_id}`
    const playlist = await (await axios.get(url, { headers })).data

    if (playlist.error) {
      db.Playlist.destroy({
        where: { playlist_id: element.dataValues.playlist_id }
      })
    } else {
      arr.push({
        id: playlist.id,
        title: playlist.name,
        images: playlist.images,
        isPrivate: element.dataValues.is_private
      })
    }
  }
  return arr
}

module.exports = {
  setPlaylists
}
