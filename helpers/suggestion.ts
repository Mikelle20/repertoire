/* eslint-disable no-restricted-syntax */
export {};
const axios = require('axios');
const { AxiosResponse } = require('axios');

const db = require('../models');

const stripPlaylists = async (arr: any, headers: { Accept: string; Authorization: string; }) => {
  const playlists = [];

  for (const element of arr) {
    const url = `https://api.spotify.com/v1/playlists/${element.dataValues.playlist_id}`;
    let playlist: { error: any; images: any; name: any; id: any; };
    await axios.get(url, { headers }).then((resp: typeof AxiosResponse) => {
      playlist = resp.data;
    }).catch((error: Error) => console.log(error));

    if (playlist.error) {
      db.Playlist.destroy({
        where: { playlist_id: element.dataValues.playlist_id },
      });
    } else {
      playlists.push({
        images: playlist.images,
        name: playlist.name,
        playlistId: playlist.id,
        checked: false,
      });
    }
  }
  return playlists;
};

module.exports = { stripPlaylists };
