'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */

        await queryInterface.bulkInsert('Product', [
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            },
            {
                name: 'ao 1',
                description: 'Day la ao 1',
                price: '1',
                categoryId: 1
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
