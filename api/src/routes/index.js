
const authRouter = require('./auth');

const INDEX = '/';

const services = require('../services');

const defaultControler = (req, res) => {
    const users = new services.Users();
    users.hello()
    res.status(200).send('Success message: Henlo hooman');
};

const routesLogger = (req, rest, next) => {
    console.log('=======================================');
    console.log(req.originalUrl);
    console.log('=======================================');
    next();
};

module.exports = app => {
    app.use(routesLogger);

    // routes
    app.use('/auth', authRouter);
    app.use(INDEX, defaultControler);
};
