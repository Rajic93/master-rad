
const Service = require('../Service');
const serviceRegistry = require('../ServiceRegistry');
const { Movies, MoviesRatings } = require('../../models');

class MoviesService extends Service {
    constructor() {
        super('movies');
        this.moviesRatings = MoviesRatings;
    }

    async findByUserId(id) {

    }

    async findAll({
        limit = 20,
        page = 0,
        search,
        order = [],
        genres = [],
    }) {
        const where = {};
        return Movies.findAndCountAll({
            where,
            order,
            limit,
            offset: page * limit,
        });
    }
}

serviceRegistry.registerService('movies', MoviesService);

module.exports = MoviesService;
