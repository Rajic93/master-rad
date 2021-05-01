
const Sequelize = require('sequelize');

const User = require('./users');
const EmailTemplate = require('./email_template');
const Book = require('./book');
const Application = require('./application');

const instance = new Sequelize('deq0ftt8uapr2p', 'fnkgdhsztkvzsj', '61ae98db23550c112620cfca8e02fc721471c412e44aa729a9eb6e1b15d203c1', {
    host: 'ec2-54-74-156-137.eu-west-1.compute.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    define: { freezeTableName: true },
    native: true
});

const models = {
    User: User.init(instance, Sequelize.DataTypes),
    Book: Book.init(instance, Sequelize.DataTypes),
    Application: Application.init(instance, Sequelize.DataTypes),
    // EmailTemplate: EmailTemplate.init(db, Sequelize.DataTypes),
};


instance.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(error => console.error('Unable to connect to the database:', error));

module.exports = {
    ...models,
    db: models,
};
