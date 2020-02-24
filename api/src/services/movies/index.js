
const Service = require('../Service');
const serviceRegistry = require('../ServiceRegistry');

class MoviesService extends Service {
    constructor() {
        super('movies');
    }

    async findByUserId(id) {

    }
}

serviceRegistry.registerService('movies', MoviesService);

module.exports = MoviesService;
