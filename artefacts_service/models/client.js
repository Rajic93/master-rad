const Sequelize = require('sequelize');

const connect = () => {
    const instance = new Sequelize('deq0ftt8uapr2p', 'fnkgdhsztkvzsj', '61ae98db23550c112620cfca8e02fc721471c412e44aa729a9eb6e1b15d203c1', {
        host: 'ec2-54-74-156-137.eu-west-1.compute.amazonaws.com',
        port: 5432,
        dialect: 'postgres',
        define: { freezeTableName: true },
    });

    instance.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(error => console.error('Unable to connect to the database:', error));

    return instance;
}

module.exports = { connect };
