const { Op } = require('sequelize')
const { getStatus } = require('../helpers/friends')
const db = require('../models')

const addFriend = async (req, res) => {
  try {
    const { user, friend } = req.body
    const friendshipExists = await db.Friend.findOne({
      attributes: ['user_1', 'user_2', 'status'],
      where: {
        [Op.or]: [
          {

            user_1: user.user_id,
            user_2: friend
          },
          {
            user_1: friend,
            user_2: user.user_id
          }
        ]
      }
    })

    if (friendshipExists) {
      db.Friend.update({ status: 'friend' }, {
        where: {
          [Op.or]: [
            {
              user_1: user.user_id,
              user_2: friend

            },
            {

              user_2: user.user_id,
              user_1: friend

            }
          ]
        }
      })
    } else {
      db.Friend.create({
        user_1: user.user_id,
        user_2: friend,
        status: 'pending'
      })
    }

    res.status(200).json({
      success: true
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

const getFriends = async (req, res) => {
  try {
    const { user } = req.body
    const userFriends = await db.Friend.findAll({
      attributes: ['user_2', 'user_1'],
      where: {
        status: 'friend',
        [Op.or]: [
          { user_1: user.user_id },
          { user_2: user.user_id }
        ]
      }
    })

    const friends = []

    userFriends.forEach(element => {
      if (element.dataValues.user_2 === user.user_id) {
        friends.push({ user_id: element.dataValues.user_1 })
      } else {
        friends.push({ user_id: element.dataValues.user_2 })
      }
    })

    db.User.findAll({
      attributes: ['user_id', 'profile_image', 'rating', 'email', 'display_name'],
      where: {
        [Op.or]: friends
      }
    }).then(resp => {
      res.status(200).send(resp)
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

const searchFriends = async (req, res) => {
  const { user, search } = req.body
  try {
    const users = await db.User.findAll({
      attributes: ['profile_image', 'display_name', 'user_id'],
      where: {
        [Op.not]: [
          { user_id: user.user_id }
        ],
        user_id: {
          [Op.startsWith]: [
            search
          ]
        }
      }
    })

    const friendStatus = await getStatus(user.user_id, users)

    const userFriends = []

    for (const friend of users) {
      for (const status of friendStatus) {
        if (status.status === 'friend') {
          userFriends.push({
            ...friend.dataValues,
            status: 3
          })
        } else if (status.status === 'pending') {
          if (status.user_1 !== user.user_id) {
            userFriends.push({
              ...friend.dataValues,
              status: 2
            })
          } else {
            userFriends.push({
              ...friend.dataValues,
              status: 1
            })
          }
        } else {
          userFriends.push({
            ...friend.dataValues,
            status: 0
          })
        }
      }
    }
    res.status(200).send(userFriends)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

const deleteFriend = async (req, res) => {
  try {
    const { friend, user } = req.body

    await db.Friend.destroy({
      where: {
        [Op.or]: [
          {
            user_1: user.user_id,
            user_2: friend

          },
          {
            user_2: user.user_id,
            user_1: friend

          }
        ]
      }
    })

    res.status(200).json({
      success: true
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong on the server side.'
    })
  }
}

module.exports = {
  addFriend,
  getFriends,
  searchFriends,
  deleteFriend
}
