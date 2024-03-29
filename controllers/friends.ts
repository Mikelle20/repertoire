/* eslint-disable no-restricted-syntax */
export {};
const { Op } = require('sequelize');
const { Request, Response } = require('express');
const { getStatus } = require('../helpers/friends');

const db = require('../models');

type UserType = { user: { user_id: string } };

const addFriend = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  try {
    const { friend } = req.body;
    const user = await (await db.User.findOne({ where: { user_id: req.user.user_id } }).catch((error: Error) => console.log(error)))?.dataValues;
    const friendshipExists = await db.Friend.findOne({
      attributes: ['user_1', 'user_2', 'status'],
      where: {
        [Op.or]: [
          {

            user_1: user.user_id,
            user_2: friend,
          },
          {
            user_1: friend,
            user_2: user.user_id,
          },
        ],
      },
    });

    if (friendshipExists) {
      db.Friend.update({ status: 'friend' }, {
        where: {
          [Op.or]: [
            {
              user_1: user.user_id,
              user_2: friend,

            },
            {

              user_2: user.user_id,
              user_1: friend,

            },
          ],
        },
      }).catch((error: Error) => console.log(error));
    } else {
      db.Friend.create({
        user_1: user.user_id,
        user_2: friend,
        status: 'pending',
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

const getFriends = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  try {
    const user = await (await db.User.findOne({ where: { user_id: req.user.user_id } }).catch((error: Error) => console.log(error)))?.dataValues;
    const userFriends = await db.Friend.findAll({
      attributes: ['user_2', 'user_1'],
      where: {
        status: 'friend',
        [Op.or]: [
          { user_1: user.user_id },
          { user_2: user.user_id },
        ],
      },
    }).catch((error: Error) => console.log(error));

    const friends = [];

    userFriends.forEach((element: { dataValues: { user_2: string; user_1: string; }; }) => {
      if (element.dataValues.user_2 === user.user_id) {
        friends.push({ user_id: element.dataValues.user_1 });
      } else {
        friends.push({ user_id: element.dataValues.user_2 });
      }
    });

    type Friend = { user_id: string; profile_image: string; rating: number; display_name: string};

    db.User.findAll({
      attributes: ['user_id', 'profile_image', 'rating', 'display_name'],
      where: {
        [Op.or]: friends,
      },
    }).then((resp: Friend[]) => {
      res.status(200).send(resp);
    }).catch((error: Error) => console.log(error));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const searchFriends = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  const { search } = req.body;
  const { user } = req;
  try {
    const users = await db.User.findAll({
      attributes: ['profile_image', 'display_name', 'user_id'],
      where: {
        [Op.not]: [
          { user_id: user.user_id },
        ],
        user_id: {
          [Op.startsWith]: [
            search,
          ],
        },
      },
    }).catch((error: Error) => console.log(error));

    const friendStatus = await getStatus(user.user_id, users);

    const userFriends = [];

    for (const friend of users) {
      for (const status of friendStatus) {
        if (status.status === 'friend') {
          userFriends.push({
            ...friend.dataValues,
            status: 3,
          });
        } else if (status.status === 'pending') {
          if (status.user_1 !== user.user_id) {
            userFriends.push({
              ...friend.dataValues,
              status: 2,
            });
          } else {
            userFriends.push({
              ...friend.dataValues,
              status: 1,
            });
          }
        } else {
          userFriends.push({
            ...friend.dataValues,
            status: 0,
          });
        }
      }
    }
    res.status(200).send(userFriends);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteFriend = async (req: typeof Request & UserType, res: typeof Response): Promise<any> => {
  try {
    const { friend } = req.body;
    const { user } = req;

    await db.Friend.destroy({
      where: {
        [Op.or]: [
          {
            user_1: user.user_id,
            user_2: friend,

          },
          {
            user_2: user.user_id,
            user_1: friend,

          },
        ],
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

module.exports = {
  addFriend,
  getFriends,
  searchFriends,
  deleteFriend,
};
