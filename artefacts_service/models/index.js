
const Sequelize = require('sequelize');
const { connect } = require('./client');

const Book = require('./books');
const BookRating = require('./books_rating');
const User = require('./users');

const db = connect();

const models = {
    Book: Book.init(db, Sequelize.DataTypes),
    BookRating: BookRating.init(db, Sequelize.DataTypes),
    User: User.init(db, Sequelize.DataTypes),
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

module.exports = {
    ...models,
    db,
    sequelize: db,
};
