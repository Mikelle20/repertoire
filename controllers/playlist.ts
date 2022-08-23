/* eslint-disable no-return-assign */
export {};
const { Request, Response } = require('express');
const { AxiosResponse } = require('axios');
const { default: axios } = require('axios');
const { Op } = require('sequelize');
const { getAccessToken } = require('../helpers/auth');
const { setPlaylists } = require('../helpers/playlists');

const db = require('../models');

type UserType = { user: { user_id: string } };

const createPlaylist = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  try {
    const { user } = req;
    const {
      title, isPrivate, accessList, description,
    } = req.body.formData;
    const data = {
      name: title,
      description,
      public: !isPrivate,
    };

    const accessToken = await getAccessToken(user.user_id);
    const url = `https://api.spotify.com/v1/users/${user.user_id}/playlists`;

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    let playlistCreated;
    await axios.post(url, data, { headers }).then((resp: typeof AxiosResponse) => {
      playlistCreated = resp.data;
    }).catch((error) => console.log(error));

    await db.Playlist.create({
      playlist_id: playlistCreated.id,
      title,
      author_id: playlistCreated.owner.id,
      is_private: isPrivate,
    }).catch((error: Error) => console.log(error));

    const playlistAccess = accessList.map((element) => ({
      playlist_id: playlistCreated.id,
      title,
      user_id: user.user_id,
      friend_id: element,
    }));

    await db.PlaylistAccess.bulkCreate(playlistAccess);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getPlaylists = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const { user } = req;
  try {
    const accessToken = await getAccessToken(user.user_id);

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    const dataPlaylists = await db.Playlist.findAll({
      attributes: ['playlist_id', 'is_private'],
      where: { author_id: user.user_id },
    }).catch((error: Error) => console.log(error));

    const playlists = await setPlaylists(dataPlaylists, headers);

    res.status(200).send(playlists);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getPlaylist = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const { playlistId } = req.body;
  const { user } = req;

  try {
    const playlistOwner = await (await db.Playlist.findOne({ where: { playlist_id: playlistId } }).catch((error: Error) => console.log(error))).dataValues.author_id;
    console.log(playlistOwner);
    if (user.user_id !== playlistOwner) return res.status(200).json({ success: true, ownership: false });
    const accessToken = await getAccessToken(user.user_id);

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    let playlist;
    await axios.get(url, { headers }).then((resp: typeof AxiosResponse) => {
      playlist = resp.data;
    }).catch((error) => console.log(error));

    res.status(200).json({
      success: true,
      description: playlist.description,
      followers: playlist.followers,
      images: playlist.images,
      name: playlist.name,
      items: playlist.tracks,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deletePlaylist = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  try {
    const { user } = req;
    const { playlistId } = req.body;

    const accessToken = await getAccessToken(user.user_id);

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, { headers }).catch((error) => console.log(error));

    await db.Playlist.destroy({
      where: {
        author_id: user.user_id,
        playlist_id: playlistId,
      },
    }).catch((error: Error) => console.log(error));

    await db.PlaylistAccess.destroy({
      where: {
        user_id: user.user_id,
        playlist_id: playlistId,
      },
    }).catch((error: Error) => console.log(error));

    await db.Suggestion.destroy({
      where: {
        receiver_id: user.user_id,
        playlist_id: playlistId,
      },
    }).catch((error: Error) => console.log(error));

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const friendsAccess = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const { playlistInfo } = req.body;
  const { user } = req;

  try {
    const isPrivate = await (await db.Playlist.findOne({
      where: {
        playlist_id: playlistInfo.playlistId,
      },
    }).catch((error: Error) => console.log(error)))?.dataValues.is_private;

    if (isPrivate) {
      const users = await db.PlaylistAccess.findAll({
        attributes: ['friend_id'],
        where: {
          user_id: user.user_id,
          playlist_id: playlistInfo.playlistId,
        },
      }).catch((error: Error) => console.log(error));

      const arr = [];
      users.forEach((element: { dataValues: { friend_id: string; }; }) => {
        arr.push({ user_id: element.dataValues.friend_id });
      });

      const friends = [];

      const friendsProfiles = await db.User.findAll({
        attributes: ['user_id', 'profile_image', 'rating', 'email', 'display_name'],
        where: {
          [Op.or]: arr,
        },
      }).catch((error: Error) => console.log(error));

      friendsProfiles.forEach((friend) => {
        friends.push({ ...friend.dataValues });
      });

      return res.status(200).send(friends);
    }
    const users = await db.Friend.findAll({
      where: {
        [Op.or]: [
          { user_1: user.user_id },
          { user_2: user.user_id },
        ],
      },
    }).catch((error: Error) => console.log(error));
    const arr = [];
    users.forEach((element) => {
      if (element.dataValues.user_2 === user.user_id) {
        arr.push({ user_id: element.dataValues.user_1 });
      } else {
        arr.push({ user_id: element.dataValues.user_2 });
      }
    });

    db.User.findAll({
      attributes: ['user_id', 'profile_image', 'rating', 'email', 'display_name'],
      where: {
        [Op.or]: arr,
      },
    }).then((resp) => {
      const friends = [];
      for (let i = 0; i < resp.length; i++) {
        friends.push({
          ...resp[i].dataValues,
        });
      }
      return res.status(200).send(friends);
    }).catch((error: Error) => console.log(error));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  friendsAccess,
  deletePlaylist,
};
