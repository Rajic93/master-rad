
const Sequelize = require('sequelize');

const sequelize = new Sequelize('masterdb', 'root', 'root', {
  host: 'users_db',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // logging: process.env.NODE_ENV === 'development',
  define: {
    underscored: false,
  },
});

sequelize
  .authenticate()
  .then(() => console.log('DB connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:\n', error.toString()));

const Authors = require('./authors');
const Books = require('./books');
const BooksAuthors = require('./book_authors');
const BooksGenres = require('./book_genres');
const BooksRatings = require('./book_ratings');
const Genres = require('./genres');
const Movies = require('./movies');
const MoviesAuthors = require('./movie_authors');
const MoviesGenres = require('./movie_genres');
const MoviesRatings = require('./movie_ratings');
const Users = require('./users');

const models = {
  Authors: Authors.init(sequelize, Sequelize),
  Books: Books.init(sequelize, Sequelize),
  BooksAuthors: BooksAuthors.init(sequelize, Sequelize),
  BooksGenres: BooksGenres.init(sequelize, Sequelize),
  BooksRatings: BooksRatings.init(sequelize, Sequelize),
  Genres: Genres.init(sequelize, Sequelize),
  Movies: Movies.init(sequelize, Sequelize),
  MoviesAuthors: MoviesAuthors.init(sequelize, Sequelize),
  MoviesGenres: MoviesGenres.init(sequelize, Sequelize),
  MoviesRatings: MoviesRatings.init(sequelize, Sequelize),
  Users: Users.init(sequelize, Sequelize),
};

Object.values(models)
  .filter((model) => {
    // model.sync({ alter: true });
    return typeof model.associate === 'function';
  })
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;

