const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('fmowneyq_shopee', 'fmowneyq_ntuanvu89', 'm1gw;ex(Id@9', {
    host: '103.221.220.68',
    port: 3306,
    dialect: 'mysql'
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connection;