
const Service = require('../Service');
const { registerService } = require('../registry');

class UsersService extends Service {
    constructor(UserModel) {
        super('users');
        this.usersModel = UserModel;
    }

    hello() {
        console.log("hello from user");
        this.moviesService.hello();
        this.booksService.hello();
    }

    findByUsername(username) {

    }
}

registerService('users', UsersService, ['movies', 'books']);

module.exports = UsersService;
