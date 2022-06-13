'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Rating.init({
    sender_id: DataTypes.STRING,
    reciever_id: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    song_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rating',
    onDelete: 'CASCADE'
  })
  return Rating
}
