const axios = require('axios')
const clustesRouter = require('./clustering_engine')

module.exports = (app) => {
    app.use('/cluster', clustesRouter)
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
