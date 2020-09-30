
const auth = require('./auth');
const users = require('./users');
const books = require('./books');
const verifyJWT = require('../middlewares/jwt');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/books', books);
  app.use('/users', verifyJWT, users);
}
