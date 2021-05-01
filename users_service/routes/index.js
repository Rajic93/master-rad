
const auth = require('./auth');
const users = require('./users');
const books = require('./books');
const verifyJWT = require('../middlewares/jwt');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/books', books);
}
