'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      },
      description: {
        type: Sequelize.STRING,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      },
      price: {
        type: Sequelize.STRING,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.BLOB('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product');
  }
};