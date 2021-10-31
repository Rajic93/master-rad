const axios = require('axios')
const clustesRouter = require('./clustering_engine')
const artefactsRouter = require('./artefacts_service')
const authRouter = require('./auth_service')
const usersRouter = require('./users_service')

let systemStatus = {
    clusteringEngine: {
        status: 'pending',
        name: 'Clustering Engine'
    },
    artefactsService: {
        status: 'pending',
        name: 'Artefacts Service'
    },
    usersService: {
        status: 'pending',
        name: 'Users Service'
    },
};

module.exports = (app) => {
    const statusMiddleware = (req, res, next) => {
        req.systemStatus = systemStatus;
        next();
    }
    // TODO: add caching for req
    app.use('/cluster', statusMiddleware, clustesRouter)
    app.use('/books', statusMiddleware, artefactsRouter)
    app.use('/auth', statusMiddleware, authRouter)
    app.use('/users', statusMiddleware, usersRouter)
    app.use('/system/status', (req, res) => {
        res.render('status.pug', {
            clusteringEngineName: systemStatus.clusteringEngine.name,
            clusteringEngineStatus: systemStatus.clusteringEngine.status,
            artefactsServiceName: systemStatus.artefactsService.name,
            artefactsServiceStatus: systemStatus.artefactsService.status,
            usersServiceName: systemStatus.usersService.name,
            usersServiceStatus: systemStatus.usersService.status,
        });
    })
    app.use('/ping', async (req, res) => {
        try {
            console.log({ query: req.query }, process.env)
            if (!req.query || !req.query.service) {
                const response = await axios({
                    method: 'get',
                    url: 'https://my-json-server.typicode.com/typicode/demo/posts'
                });    
                console.log({ response })
                return res.send(response.data)
            }
            if (req.query.service === 'clusterization_engine') {
                const response = await axios({
                    method: 'get',
                    url: `${process.env.BASE_URL_CLUSTERIZATION}/ping`
                });  
                console.log({ response })
                return res.send(response.data)
            }
            if (req.query.service === 'artefacts_service') {
                const response = await axios({
                    method: 'get',
                    url: `${process.env.BASE_URL_ARTEFACTS}/ping`
                });  
                console.log({ response })
                return res.send(response.data)
            }
            if (req.query.service === 'users_service') {
                const response = await axios({
                    method: 'get',
                    url: `${process.env.BASE_URL_USERS}/ping`
                });  
                console.log({ response })
                return res.send(response.data)
            }
            return res.send('Unknown service');
        } catch(e) {
            res.send(e.toString())
        }
    });
}
