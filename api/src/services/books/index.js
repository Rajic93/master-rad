
const Service = require('../Service');
const serviceRegistry = require('../ServiceRegistry');
const { Books, BooksRatings } = require('../../models');

class BooksService extends Service {
    constructor() {
        super('books');
        this.booksRatings = BooksRatings;
    }

    async findById(id) {
        return Books.findById(id);
    }

    async findAll({
        limit = 20,
        page = 0,
        search,
        order = [],
        genres = [],
    }) {
        const where = {};
        return Books.findAndCountAll({
            where,
            order,
            limit,
            offset: page * limit,
        });
    }
}

serviceRegistry.registerService('books', BooksService);

module.exports = BooksService;
