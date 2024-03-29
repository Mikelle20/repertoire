/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
export {};
const { Request, Response } = require('express');
const { AxiosResponse } = require('axios');
const { default: axios } = require('axios');
const { getAccessToken } = require('../helpers/auth');
const { ratingAvg } = require('../helpers/rating');
const { stripPlaylists } = require('../helpers/suggestion');

const db = require('../models');

type UserType = { user: { user_id: string } };

const search = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  try {
    const { search } = req.body;
    const { user } = req;
    const arr = [];

    const accessToken = await getAccessToken(user.user_id);

    const endPoint = 'https://api.spotify.com/v1/search?q=';
    const bearer = `Bearer ${accessToken}`;
    const headers = {
      Accept: 'application/json',
      Authorization: bearer,
      'Content-Type': 'application/json',
    };

    const url = `${endPoint}track%3A${search}&type=track&market=ES&limit=10`;

    let tracks: any;
    await axios.get(url, { headers }).then((resp) => {
      tracks = resp.data.tracks.items;
    }).catch((error) => console.log(error));

    for (const element of tracks) {
      const track = {
        title: element.name,
        cover: element.album.images[0].url,
        artist: element.artists[0].name,
        explicit: element.explicit,
        songId: element.id,
      };
      arr.push(track);
    }

    res.status(200).json(arr);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const suggest = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const { friend_id, song_id, playlist_id } = req.body;
  const { user } = req;

  try {
    await db.Suggestion.create({
      song_id,
      playlist_id,
      sender_id: user.user_id,
      receiver_id: friend_id,
    });

    const accessToken = await getAccessToken(friend_id);

    const bearer = `Bearer ${accessToken}`;

    const headers = {
      Accept: 'application/json',
      Authorization: bearer,
      'Content-Type': 'application/json',
    };

    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=spotify%3Atrack%3A${song_id}`;

    await axios.post(url, null, { headers }).catch((error) => console.log(error));

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error.response);
    res.status(500).json({
      success: false,
      error: 'Something went wrong server side.',
    });

    db.Suggestion.destroy({
      where: {
        song_id,
        playlist_id,
        sender_id: user.user_id,
        receiver_id: friend_id,
      },
    }).catch((error: Error) => console.log(error));
  }
};

const rate = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const {
    rating, receiverId, songId, playlistId,
  } = req.body;
  const { user } = req;

  try {
    const ratingExist = await db.Rating.findOne({
      where: {
        sender_id: user.user_id,
        reciever_id: receiverId,
        playlist_id: playlistId,
        song_id: songId,
      },
    }).catch((error: Error) => console.log(error));

    if (ratingExist) {
      await db.Rating.update({
        rating,
      }, {
        where: {
          sender_id: user.user_id,
          reciever_id: receiverId,
          playlist_id: playlistId,
          song_id: songId,
        },
      }).catch((error: Error) => console.log(error));
    } else {
      await db.Rating.create({
        sender_id: user.user_id,
        reciever_id: receiverId,
        song_id: songId,
        playlist_id: playlistId,
        rating,
      }).catch((error: Error) => console.log(error));
    }

    const ratings = await db.Rating.findAll({
      where: {
        reciever_id: receiverId,
      },
      attributes: ['rating'],
    }).catch((error: Error) => console.log(error));

    const ratingSum = ratings.reduce((accumulator: number, object: { rating: number; }) => accumulator + object.rating, 0);

    const newRating = ratingAvg(ratingSum, ratings.length);

    await db.User.update({ rating: newRating }, {
      where: { user_id: receiverId },
    }).catch((error: any) => console.log(error));

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getAccessedPlaylists = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const { friend } = req.body;
  const { user } = req;
  let playlistsAccessed = [];

  try {
    const accessToken = await getAccessToken(friend);

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    await db.PlaylistAccess.findAll({
      attributes: ['playlist_id'],
      where: {
        user_id: friend,
        friend_id: user.user_id,
      },
    }).then(async (resp: typeof AxiosResponse) => {
      playlistsAccessed = await stripPlaylists(resp, headers);
    }).catch((error: Error) => console.log(error));

    await db.Playlist.findAll({
      attributes: ['playlist_id'],
      where: {
        author_id: friend,
        is_private: false,
      },
    }).then(async (resp: typeof AxiosResponse) => {
      const otherPlaylists = await stripPlaylists(resp, headers);
      playlistsAccessed = [...playlistsAccessed, ...otherPlaylists];
    }).catch((error: Error) => console.log(error));

    res.status(200).send(playlistsAccessed);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getSuggestions = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const { playlistId } = req.body;
  const { user } = req;
  const arr = [];

  try {
    const accessToken = await getAccessToken(user.user_id);

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    const suggestions = await db.Suggestion.findAll({
      attributes: ['song_id', 'sender_id'],
      where: {
        playlist_id: playlistId,
        receiver_id: user.user_id,
      },
    }).catch((error: any) => console.log(error));

    for (let i = 0; i < suggestions.length; i++) {
      const sender = await db.User.findOne({
        attributes: ['display_name', 'profile_image'],
        where: {
          user_id: suggestions[i].dataValues.sender_id,
        },
      }).catch((error: Error) => console.log(error));

      let song;
      await axios({
        method: 'GET',
        url: `https://api.spotify.com/v1/tracks/${suggestions[i].dataValues.song_id}`,
        headers,
      }).then((resp) => {
        song = resp.data;
      }).catch((error: Error) => console.log(error));

      const rating = await db.Rating.findOne({
        attributes: ['rating'],
        where: {
          playlist_id: playlistId,
          song_id: suggestions[i].dataValues.song_id,
          sender_id: user.user_id,
          reciever_id: suggestions[i].dataValues.sender_id,
        },
      }).catch((error: Error) => console.log(error));

      arr.push({
        songId: suggestions[i].dataValues.song_id,
        senderId: suggestions[i].dataValues.sender_id,
        senderImage: sender.dataValues.profile_image,
        senderName: sender.dataValues.display_name,
        songName: song.name,
        songImage: song.album.images[0].url,
        rating: rating ? rating.dataValues.rating : 0,
      });
    }

    res.status(200).send(arr);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  search,
  suggest,
  rate,
  getAccessedPlaylists,
  getSuggestions,
};
