const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('b51c3pupfagrchg2v7jy', 'uytwr8ltf9ormvha', 'NGU0NvbSAdRc4irvsIur', {
    host: 'b51c3pupfagrchg2v7jy-mysql.services.clever-cloud.com',
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