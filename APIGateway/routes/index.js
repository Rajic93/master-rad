const axios = require('axios')

module.exports = (app) => {
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
