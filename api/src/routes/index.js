
const jwtMiddleware = require('../middlewares/jwt');

const authRouter = require('./auth');
const booksRouter = require('./books');

const INDEX = '/';
const AUTH = '/auth';
const BOOKS = '/books';

const defaultControler = async (req, res) => {
    res.status(200).send('Henlo hooman, this is master_api speeking!');
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
    app.use(AUTH, authRouter);
    app.use(BOOKS, jwtMiddleware, booksRouter);
    app.use(INDEX, defaultControler);
};
