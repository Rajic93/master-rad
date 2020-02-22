
const Service = require('../Service');
const { registerService } = require('../registry');

class BooksService extends Service {
    constructor() {
        super('books');
    }

    hello() {
        console.log('hello this is book')
    }
}

registerService('books', BooksService);

module.exports = BooksService;
