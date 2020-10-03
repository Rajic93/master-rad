
const Sequelize = require('sequelize');
const { connect } = require('./client');

const User = require('./users');
const EmailTemplate = require('./email_template');

const db = connect();

const models = {
    User: User.init(db, Sequelize.DataTypes),
    EmailTemplate: EmailTemplate.init(db, Sequelize.DataTypes),
};

module.exports = {
    ...models,
    db,
};
