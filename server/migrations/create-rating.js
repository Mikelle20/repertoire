'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_id: {
        type: Sequelize.STRING
      },
      reciever_id: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      playlist_id: {
        type: Sequelize.STRING
      },
      song_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    // await queryInterface.dropTable('Ratings')
    await queryInterface.dropAllTables()
  }
}
