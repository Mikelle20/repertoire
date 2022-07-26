'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          min: 8
        }
      },
      spotify_connected: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      display_name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
        validate: {
          len: [2, 15],
          notNull: false,
          notEmpty: true
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notNull: false
        }
      },
      profile_image: {
        type: Sequelize.STRING,
        unique: false,
        defaultValue: 'https://i.scdn.co/image/ab6761610000e5eb1020c22e0ce742eca7166e65',
        allowNull: true
      },
      rating: {
        type: Sequelize.FLOAT,
        unique: false,
        defaultValue: 0
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      server_refresh_token: {
        type: Sequelize.STRING(500),
        allowNull: true,
        unique: true
      },
      reset_token: {
        type: Sequelize.STRING(500),
        allowNull: true,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}
