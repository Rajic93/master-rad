
const Sequelize = require('sequelize');
const { connect } = require('./client');

const Book = require('./books');
const BookRating = require('./books_rating');

const db = connect();

const models = {
    Book: Book.init(db, Sequelize.DataTypes),
    BookRating: BookRating.init(db, Sequelize.DataTypes),
};

module.exports = {
    ...models,
    db,
};
