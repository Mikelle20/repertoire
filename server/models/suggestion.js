'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Suggestion.belongsTo(models.User, { foreignKey: 'senderId' })
    }
  }
  Suggestion.init({
    song_id: DataTypes.STRING,
    playlist_id: DataTypes.STRING,
    sender_id: DataTypes.STRING,
    receiver_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Suggestion'
  })
  return Suggestion
}
