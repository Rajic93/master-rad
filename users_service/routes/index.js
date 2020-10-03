
const auth = require('./auth');
const users = require('./users');
const email = require('./email');
const verifyJWT = require('../middlewares/jwt');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/email', email)
  app.use('/users', verifyJWT, users);
}
