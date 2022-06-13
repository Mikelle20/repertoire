'use strict'

const { nanoid } = require('nanoid')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        user_id: nanoid(),
        display_name: 'admin',
        email: 'test1@test.com',
        refresh_token: nanoid(42),
        createdAt: new Date()
      },
      {
        id: 2,
        user_id: nanoid(),
        display_name: 'ada',
        email: 'test2@test.com',
        refresh_token: nanoid(42),
        createdAt: new Date()
      },
      {
        id: 3,
        user_id: nanoid(),
        display_name: 'ambar',
        email: 'test3@test.com',
        createdAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users')
  }
}
