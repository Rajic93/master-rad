
const jwt = require('jsonwebtoken');

const SECRET = process.env.AUTH_JWT_SECRET;

const sign = (data) => jwt.sign(data, SECRET, { expiresIn: '1h' });

const verify = (token) => jwt.verify(token, SECRET);

module.exports = {
  sign,
  verify,
};
