
const authRouter = require('./auth');

const INDEX = '/';

const defaultControler = async (req, res) => {
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
