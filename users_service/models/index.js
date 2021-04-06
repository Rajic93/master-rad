
const Sequelize = require('sequelize');

const User = require('./users');
const EmailTemplate = require('./email_template');
const Book = require('./book');

const instance = new Sequelize('masterdb', 'root', 'root', {
    host: 'localhost',
    port: 5003,
    dialect: 'postgres',
    define: { freezeTableName: true },
});


const models = {
    User: User.init(instance, Sequelize.DataTypes),
    Book: Book.init(instance, Sequelize.DataTypes),
    // EmailTemplate: EmailTemplate.init(db, Sequelize.DataTypes),
};


instance.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(error => console.error('Unable to connect to the database:', error));

module.exports = {
    ...models,
    db: models,
};
