const { Op } = require('sequelize')
const db = require('../models')

const addFriend = async (req, res) => {
  const { user, friend } = req.body
  const friendshipExists = await db.Friend.findOne({
    attributes: ['user_1', 'user_2', 'status'],
    where: {
      [Op.or]: [
        { user_1: user.email },
        { user_1: friend }
      ]
    }
  })

  if (friendshipExists) {
    db.Friend.update({ status: 'friend' }, {
      where: {
        [Op.or]: [
          { user_1: user.email },
          { user_1: friend }
        ]
      }
    })
  } else {
    db.Friend.create({
      user_1: user.email,
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
            { user_1: user.email },
            { user_2: user.email }
          ]
        }
      ]
    }
  }).then((resp) => {
    const arr = []
    resp.forEach(element => {
      if (element.dataValues.user_2 === user.email) {
        arr.push({ email: element.dataValues.user_1 })
      } else {
        arr.push({ email: element.dataValues.user_2 })
      }
    })

    db.User.findAll({
      attributes: ['user_id', 'profile_image', 'rating', 'email', 'display_name'],
      where: {
        [Op.or]: arr
      }
    }).then(resp => res.send(resp))
  })
}

module.exports = {
  addFriend,
  getFriends
}
