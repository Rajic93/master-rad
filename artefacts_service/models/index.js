
const Sequelize = require('sequelize');
const { connect } = require('./client');

const Book = require('./books');

const db = connect();

const models = {
    Book: Book.init(db, Sequelize.DataTypes),
};

module.exports = {
    ...models,
    db,
};
