const Sequelize = require('sequelize');

const connect = () => {
    const instance = new Sequelize('masterdb', 'root', 'root', {
        host: 'localhost',
        port: 5003,
        dialect: 'postgres',
        define: { freezeTableName: true },
    });

    instance.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(error => console.error('Unable to connect to the database:', error));

    return instance;
}

module.exports = { connect };
