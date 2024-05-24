'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'shop',
        'contact',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'shop',
        'Phone',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'shop',
        'page',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'shop',
        'address',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'shop',
        'description',
        Sequelize.STRING
      )
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};