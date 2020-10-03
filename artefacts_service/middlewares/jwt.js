const { verify } = require('../utilities/jwt');

const verifyJwtToken = (req, res, next) => {
  try {
    const { headers: { authorization } } = req;

    if (!authorization) {
      throw new Error('Unauthorized');
    }
    const token = req.headers.authorization.substring(7);

    const user = verify(token);

    if (!user) {
      throw new Error('Unauthorized');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error.toString());
  }
};

module.exports = verifyJwtToken;
