'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PlaylistAccesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      playlist_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Playlists',
          key: 'playlist_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropAllTables()
  }
}
