
const auth = require('./auth');
const users = require('./users');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/users', users);
}