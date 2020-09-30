
const Sequelize = require('sequelize');
const { connect } = require('./client');

// const User = require('./users');
const Book = require('./books');

const db = connect();

const models = {
    // User: User.init(Sequelize, Sequelize.DataTypes),
    Book: Book.init(db, Sequelize.DataTypes),
    //
};

module.exports = {
    ...models,
    db,
};
