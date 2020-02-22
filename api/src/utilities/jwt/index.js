
const jwt = require('jsonwebtoken');

const EXPIRATION_IN = Math.floor(Date.now() / 1000) + (60 * 60);

const SECRET = 'some dummy secret for now';

const sign = data => jwt.sign(data, SECRET, { expiresIn: EXPIRATION_IN });

const verify = token => jwt.verify(token, SECRET);

module.exports = {
    sign,
    verify,
};
