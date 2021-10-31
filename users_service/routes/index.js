
const auth = require('./auth');
const users = require('./users');
const verifyJWT = require('../middlewares/jwt');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/ping', (req, res) => {
    res.send('Hello from users service!');
  });
}
