const { Op } = require('sequelize')
const { stripFriends, getStatus } = require('../helpers/friends')
const db = require('../models')

const addFriend = async (req, res) => {
  const { user, friend } = req.body
  const friendshipExists = await db.Friend.findOne({
    attributes: ['user_1', 'user_2', 'status'],
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { user_1: user.user_id },
            { user_2: friend }
          ]
        },
        {
          [Op.and]: [
            { user_1: friend },
            { user_2: user.user_id }
          ]
        }
      ]
    }
  })

  if (friendshipExists) {
    db.Friend.update({ status: 'friend' }, {
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { user_1: user.user_id },
              { user_2: friend }
            ]
          },
          {
            [Op.and]: [
              { user_2: user.user_id },
              { user_1: friend }
            ]
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

  res.send('friendship updated')
}

const getFriends = (req, res) => {
  const { user } = req.body
  console.log(user.user_id)
  db.Friend.findAll({
    attributes: ['user_2', 'user_1'],
    where: {
      [Op.and]: [
        { status: 'friend' },
        {
          [Op.or]: [
            { user_1: user.user_id },
            { user_2: user.user_id }
          ]
        }
      ]
    }
  }).then((resp) => {
    console.log(resp)
    const arr = []
    resp.forEach(element => {
      if (element.dataValues.user_2 === user.user_id) {
        arr.push({ user_id: element.dataValues.user_1 })
      } else {
        arr.push({ user_id: element.dataValues.user_2 })
      }
    })

    db.User.findAll({
      attributes: ['user_id', 'profile_image', 'rating', 'email', 'display_name'],
      where: {
        [Op.or]: arr
      }
    }).then(resp => {
      res.send(resp)
    })
  })
}

const searchFriends = async (req, res) => {
  const { user, search } = req.body

  const users = await db.User.findAll({
    attributes: ['profile_image', 'display_name', 'user_id'],
    where: {
      [Op.and]: [
        {
          [Op.not]: [
            { user_id: user.user_id }
          ]
        },
        {
          user_id: {
            [Op.startsWith]: [
              search
            ]
          }
        }
      ]
    }
  })

  const strippedFriends = await stripFriends(users)

  const friendStatus = await getStatus(user.user_id, strippedFriends)

  const userFriends = []

  for (const friend of strippedFriends) {
    for (const status of friendStatus) {
      if (status.status === 'friend') {
        userFriends.push({
          ...friend,
          status: 3
        })
      } else if (status.status === 'pending') {
        if (status.user_1 !== user.user_id) {
          userFriends.push({
            ...friend,
            status: 2
          })
        } else {
          userFriends.push({
            ...friend,
            status: 1
          })
        }
      } else {
        userFriends.push({
          ...friend,
          status: 0
        })
      }
    }
  }
  res.send(userFriends)
}

module.exports = {
  addFriend,
  getFriends,
  searchFriends
}
