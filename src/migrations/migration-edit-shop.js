module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Shop', 'logo', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ],
            [
                queryInterface.changeColumn('Shop', 'background', {
                    type: Sequelize.BLOB('long'),
                    allowNull: true,
                })
            ]
        )
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Shop', 'logo', {
                type: Sequelize.BLOB,
                allowNull: true,
            })
        ],
            [
                queryInterface.changeColumn('Shop', 'background', {
                    type: Sequelize.BLOB,
                    allowNull: true,
                })
            ]
        )
    }
};