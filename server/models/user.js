'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Suggestion, { foreignKey: 'sender_id' })
      User.belongsToMany(models.Playlist, { through: 'playlist_access', foreignKey: 'userId' })
    }
  }
  User.init({
    refresh_token: DataTypes.STRING,
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    user_id: DataTypes.STRING,
    password: DataTypes.STRING,
    spotify_connected: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'User',
    updatedAt: false,
    onDelete: 'CASCADE'
  })
  return User
}
