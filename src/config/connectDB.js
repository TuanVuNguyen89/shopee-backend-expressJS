const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('z0vz6mqi3014e6pl', 'f4b67auhz6s3gmt6',
    "et3itnhm1vziys18", {
    host: 'mwgmw3rs78pvwk4e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
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