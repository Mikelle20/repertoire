const { default: axios } = require('axios')
const db = require('../models')

const stripPlaylists = async (arr, headers) => {
  const playlists = []
  for (const element of arr) {
    await axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/playlists/${element.dataValues.playlist_id}`,
      headers
    }).then(res => {
      if (res.error) {
        db.Playlist.destroy({
          where: { playlist_id: element.dataValues.playlist_id }
        })
      } else {
        playlists.push({
          images: res.data.images,
          name: res.data.name,
          playlistId: res.data.id,
          checked: false
        })
      }
    })
  }
  return playlists
}

module.exports = {
  stripPlaylists
}
