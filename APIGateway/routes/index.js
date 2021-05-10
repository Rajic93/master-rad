const axios = require('axios')
const clustesRouter = require('./clustering_engine')
const artefactsRouter = require('./artefacts_service')
const authRouter = require('./auth_service')
const usersRouter = require('./users_service')

module.exports = (app) => {
    app.use('/cluster', clustesRouter)
    app.use('/books', artefactsRouter)
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/', async (req, res) => {
        try{
            const response = await axios({
            method: 'get',
            url: 'https://my-json-server.typicode.com/typicode/demo/posts'
          });    
        res.send(response.data)
        }catch(e){
            res.send(e.toString())
        }
    });
}
