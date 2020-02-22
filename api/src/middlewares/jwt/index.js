
const { verify } = require('../../utilities/jwt');

const verifyJwtToken = (req, res, next) => {
    try {
        const { headers: { Authorization } } = req;

        if (!Authorization) {
            throw new Error('Unauthorized');
        }
        const token = Authorization.substring('Bearer ');
        const user = verify(token);

        if (!user) {
            throw new Error('Unauthorized');
        }
        
        req.user = user;
    } catch (error) {
        res.status(401).send(error.toString());
    } finally {
        next();
    }
};

module.exports = verifyJwtToken;
