const { default: axios } = require('axios')
const db = require('../models')

const setPlaylists = async (playlists, headers) => {
  const arr = []
  for (const element of playlists) {
    await axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/playlists/${element.dataValues.playlist_id}`,
      headers
    }).then(res => {
      if (res.data.error) {
        db.Playlist.destroy({
          where: { playlist_id: element.dataValues.playlist_id }
        })
      } else {
        arr.push({
          id: res.data.id,
          title: res.data.name,
          images: res.data.images,
          isPrivate: element.dataValues.is_private
        })
      }
    })
  }
  return arr
}

module.exports = {
  setPlaylists
}
