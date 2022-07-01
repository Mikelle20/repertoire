'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Playlist.belongsToMany(models.User, { through: 'playlist_access', foreignKey: 'playlistId' })
    }
  }
  Playlist.init({
    playlist_id: DataTypes.STRING,
    author_id: DataTypes.STRING,
    is_private: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Playlist',
    onDelete: 'CASCADE',
    updatedAt: false
  })
  return Playlist
}
