
const auth = require('./auth');
const users = require('./users');
const email = require('./email');
const books = require('./books');
const verifyJWT = require('../middlewares/jwt');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/email', email)
  app.use('/users', users);
  app.use('/books', books);
}
