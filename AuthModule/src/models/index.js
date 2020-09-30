
const Sequelize = require('sequelize');
const { connect } = require('./client');

const User = require('./users');

const db = connect();

const models = {
    User: User.init(Sequelize, Sequelize.DataTypes),
    //
};

models.User.sync();


module.exports = {
    ...models,
    db,
};