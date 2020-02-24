
const Service = require('../Service');
const { registerService } = require('../registry');

class BooksService extends Service {
    constructor() {
        super('books');
    }

    async findByUserId(id) {

    }
}

registerService('books', BooksService);

module.exports = BooksService;
