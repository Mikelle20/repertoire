'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PlaylistAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  PlaylistAccess.init({
    user_id: DataTypes.STRING,
    playlist_id: DataTypes.STRING,
    friend_id: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PlaylistAccess',
    onDelete: 'CASCADE',
    updatedAt: false
  })
  return PlaylistAccess
}
