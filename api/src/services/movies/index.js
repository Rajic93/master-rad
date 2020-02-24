
const Service = require('../Service');
const { registerService } = require('../registry');

class MoviesService extends Service {
    constructor() {
        super('movies');
    }

    async findByUserId(id) {

    }
}

registerService('movies', MoviesService);

module.exports = MoviesService;
