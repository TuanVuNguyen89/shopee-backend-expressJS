const { Transaction } = require("sequelize");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Product', 'price', {
                type: Sequelize.TEXT,
                allowNull: true,
            })
        ], {
            Transaction
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Product', 'price', {
                type: Sequelize.INTEGER,
                allowNull: true,
            })
        ], {
            Transaction
        }
        )
    }
};