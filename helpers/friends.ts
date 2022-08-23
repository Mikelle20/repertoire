const { Op } = require('sequelize');
const db = require('../models');

// const stripFriends = (arr) => {
//   const strippedfriends = arr.map(friend => {
//     return {
//       user_id: friend.dataValues.user_id,
//       display_name: friend.dataValues.display_name,
//       profile_image: friend.dataValues.profile_image
//     }
//   })

//   return strippedfriends
// }

const getStatus = async (searcher: string, arr: string | any[]) => {
  try {
    const statuses = [];
    for (let i = 0; i < arr.length; i++) {
      await db.Friend.findOne({
        where: {
          [Op.or]: [
            {
              user_1: searcher,
              user_2: arr[i].user_id,
            },
            {
              user_2: searcher,
              user_1: arr[i].user_id,
            },
          ],
        },
      }).then((res) => {
        if (res) {
          statuses.push({
            ...res.dataValues,
          });
        } else {
          statuses.push({
            user_1: arr[i].user_id,
            status: 'no association',
          });
        }
      }).catch((error: Error) => console.log(error));
    }

    return statuses;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getStatus,
};
