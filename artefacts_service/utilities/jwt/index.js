
const jwt = require('jsonwebtoken');

const SECRET = 'some dummy secret for now';

const sign = (data) => jwt.sign(data, SECRET, { expiresIn: '1h' });

const verify = (token) => jwt.verify(token, SECRET);

module.exports = {
  sign,
  verify,
};
