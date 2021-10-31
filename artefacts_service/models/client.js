const Sequelize = require('sequelize');
require('dotenv').config();


const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    schema: process.env.DB_SCHEMA,
};

const connect = () => {
    const instance = new Sequelize(
        config.schema,
        config.user,
        config.password,
        {
            host: config.host,
            port: config.port,
            dialect: 'postgres',
            define: { freezeTableName: true },
            native: true,
        },
    );

    instance.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(error => console.error('Unable to connect to the database:', error));

    return instance;
}

module.exports = { connect };
