
const Service = require('../Service');
const { registerService } = require('../registry');

class MoviesService extends Service {
    constructor() {
        super('movies');
    }

    hello() {
        console.log('hello this is movie')
    }
}

registerService('movies', MoviesService);

module.exports = MoviesService;
