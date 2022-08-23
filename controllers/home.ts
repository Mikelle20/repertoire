export {};
const { AxiosError } = require('axios');
const { AxiosResponse } = require('axios');
const { default: axios } = require('axios');
const { Op } = require('sequelize');
const { Request, Response } = require('express');
const sort = require('sort-array');
const { getAccessToken } = require('../helpers/auth');

const db = require('../models');

type UserType = { user: { user_id: string, email: string } };

const setHome = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const { user } = req;

  console.log(user);

  try {
    const userData = await (await db.User.findOne({
      attributes: ['rating', 'display_name', 'profile_image', 'user_id', 'email'],
      where: { email: user.email },
    }))?.dataValues;

    const accessToken = await getAccessToken(userData.user_id);

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    console.log(headers);

    const suggestions = await db.Suggestion.findAll({
      where: {
        receiver_id: user.user_id,
      },
    }).catch((error: Error) => console.log(error));

    const playlists = await db.Playlist.findAll({
      where: {
        author_id: user.user_id,
      },
    }).catch((error: Error) => console.log(error));

    const friendships = await db.Friend.findAll({
      where: {
        status: 'friend',
        [Op.or]: [
          { user_1: user.user_id },
          { user_2: user.user_id },
        ],
      },
    }).catch((error: Error) => console.log(error));

    const friends = [];
    for (let i = 0; i < friendships.length; i++) {
      if (friendships[i].dataValues.user_1 === user.user_id) {
        friends.push({ friendId: friendships[i].dataValues.user_2 });
      } else {
        friends.push({ friendId: friendships[i].dataValues.user_1 });
      }
    }

    const friendsListens = [];

    if (friends.length !== 0) {
      for (let i = 0; i < friends.length; i++) {
        const friendToken = await getAccessToken(friends[i].friendId);

        const friend = await (await db.User.findOne({
          where: { user_id: friends[i].friendId },
        }))?.dataValues;

        const friendHeaders = {
          Authorization: `Bearer ${friendToken}`,
        };

        let recentListen;
        await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', { headers: friendHeaders }).then((resp: typeof AxiosResponse) => {
          recentListen = resp.data;
        }).catch((error: typeof AxiosError) => console.log(error.response));
        friendsListens.push({
          friendName: friend.display_name,
          friendImage: friend.profile_image,
          songName: recentListen.items[0].track.name,
          songImage: recentListen.items[0].track.album.images[0].url,
          playedAt: recentListen.items[0].played_at,
        });
      }
    }

    const homeSuggestions = [];
    const homePlaylists = [];

    if (suggestions.length !== 0) {
      for (let i = 0; i < suggestions.length; i++) {
        let song;
        await axios({
          method: 'GET',
          url: `https://api.spotify.com/v1/tracks/${suggestions[i].dataValues.song_id}`,
          headers,
        }).then((resp: typeof AxiosResponse) => {
          song = resp.data;
        }).catch((error) => console.log(error));

        const sender = await (await db.User.findOne({
          where: { user_id: suggestions[i].sender_id },
        }).catch((error: Error) => console.log(error)))?.dataValues;

        homeSuggestions.push({
          songId: suggestions[i].dataValues.song_id,
          songImage: song.album.images,
          songName: song.name,
          playlistId: suggestions[i].dataValues.playlist_id,
          senderId: sender.user_id,
          senderImage: sender.profile_image,
          senderName: sender.display_name,
          createdAt: suggestions[i].dataValues.createdAt,
        });
      }
    }

    if (playlists !== 0) {
      for (let i = 0; i < playlists.length; i++) {
        let playlist;
        await axios({
          method: 'GET',
          url: `https://api.spotify.com/v1/playlists/${playlists[i].dataValues.playlist_id}`,
          headers,
        }).then((resp: typeof AxiosResponse) => {
          playlist = resp.data;
        }).catch((error: Error) => console.log(error));

        homePlaylists.push({
          type: 0,
          playlistId: playlists[i].dataValues.playlist_id,
          playlistImage: playlist.images,
          playlistName: playlist.name,
          createdAt: playlists[i].dataValues.createdAt,
          isPrivate: playlists[i].dataValues.is_private,
        });
      }
    }

    let items;
    await axios({
      method: 'GET',
      url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0',
      headers,
    }).then((resp: typeof AxiosResponse) => {
      items = resp.data;
    }).catch((error) => console.log(error));

    let tracks;
    await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0', { headers }).then((resp: typeof AxiosResponse) => {
      tracks = resp.data;
    }).catch((error: Error) => console.log(error));

    const sortedPlaylists = sort(homePlaylists, { order: 'desc', by: 'createdAt' });
    const sortedSuggestions = sort(homeSuggestions, { order: 'desc', by: 'createdAt' });
    const sortedListens = sort(friendsListens, { order: 'desc', by: 'playedAt' });

    res.status(200).json({
      success: true,
      homePlaylists: sortedPlaylists,
      homeSuggestions: sortedSuggestions,
      items: items.items,
      tracks: tracks.items,
      friendListens: sortedListens,
      user: {
        ...userData,
      },
    });
  } catch (error) {
    console.log(error.response);
    res.sendStatus(500);
  }
};

const getSocials = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const { user } = req;

  try {
    const accessToken = await getAccessToken(user.user_id);

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    const socials = [];

    const ratings = await db.Rating.findAll({
      where: {
        reciever_id: user.user_id,
      },
    }).catch((error: Error) => console.log(error));

    if (ratings.length !== 0) {
      for (let i = 0; i < ratings.length; i++) {
        const song = await (await axios({
          method: 'GET',
          url: `https://api.spotify.com/v1/tracks/${ratings[i].dataValues.song_id}`,
          headers,
        }))?.data;

        const sender = await (await db.User.findOne({
          where: {
            user_id: ratings[i].dataValues.sender_id,
          },
        }).catch((error: Error) => console.log(error)))?.dataValues;

        socials.push({
          type: 1,
          rating: ratings[i].dataValues.rating,
          senderName: sender.display_name,
          senderImage: sender.profile_image,
          createdAt: ratings[i].dataValues.createdAt,
          songName: song.name,
          songImage: song.album.images,
          songArtist: song.album.artists[0].name,
        });
      }
    }

    const playlistAdded = await db.PlaylistAccess.findAll({
      where: {
        friend_id: user.user_id,
      },
    }).catch((error) => console.log(error));

    if (playlistAdded.length !== 0) {
      for (let i = 0; i < playlistAdded.length; i++) {
        let playlist;
        await axios({
          method: 'GET',
          url: `https://api.spotify.com/v1/playlists/${playlistAdded[i].dataValues.playlist_id}`,
          headers,
        }).then((resp) => {
          playlist = resp.data;
        }).catch((error) => console.log(error));

        const owner = await (await db.User.findOne({
          where: {
            user_id: playlistAdded[i].dataValues.user_id,
          },
        }).catch((error: Error) => console.log(error)))?.dataValues;

        socials.push({
          playlistOwner: playlistAdded[i].dataValues.user_id,
          createdAt: playlistAdded[i].dataValues.createdAt,
          ownerName: owner.display_name,
          ownerImage: owner.profile_image,
          playlistName: playlist.name,
          playlistImage: playlist.images,
        });
      }
    }

    const friends = [];
    const friendIds = await db.Friend.findAll({
      where: {
        status: 'friend',
        [Op.or]: [
          { user_1: user.user_id },
          { user_2: user.user_id },
        ],
      },
    }).catch((error: Error) => console.log(error));

    for (let i = 0; i < friendIds.length; i++) {
      let friendId: string;

      if (friendIds[i].dataValues.user_1 === user.user_id) {
        friendId = friendIds[i].dataValues.user_2;
      } else {
        friendId = friendIds[i].dataValues.user_1;
      }

      const friend = await db.User.findOne({
        where: { user_id: friendId },
        attributes: ['user_id', 'display_name', 'profile_image'],
      }).catch((error: Error) => console.log(error));

      friends.push(friend?.dataValues);
    }
    const sortedFriends = sort(friends, { by: 'display_name' });
    const sortedSocials = sort(socials, { order: 'desc', by: 'createdAt' });

    res.status(200).json({
      success: true,
      friends: sortedFriends,
      socials: sortedSocials,
    });
  } catch (error) {
    console.log(error.response);
    res.sendStatus(500);
  }
};

module.exports = {
  setHome,
  getSocials,
};
