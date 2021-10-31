
const books = require('./books');
const verifyJWT = require('../middlewares/jwt');

module.exports = (app) => {
  app.use('/books', books);
  app.use('/ping', (req, res) => {
    res.send('Hello from artefacts service!');
  });
}
