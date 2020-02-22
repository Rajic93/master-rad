
const INDEX = '/';

const defaultControler = (req, res) => {
    res.status(200).send('Success message: Hello from clustering engine!!!');
};


const routesLogger = (req, rest, next) => {
    console.log('=======================================');
    console.log(req.originalUrl)
    console.log('=======================================');
    next();
}


module.exports = app => {
    app.use(routesLogger);
    
    // routes
    app.use(INDEX, defaultControler);
};
