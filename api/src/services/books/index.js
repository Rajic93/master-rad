
const Service = require('../Service');
const serviceRegistry = require('../ServiceRegistry');

class BooksService extends Service {
    constructor() {
        super('books');
    }

    async findByUserId(id) {

    }
}

serviceRegistry.registerService('books', BooksService);

module.exports = BooksService;
