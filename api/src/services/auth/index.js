
const Service = require('../Service');
const ServiceRegistry = require('../ServiceRegistry');
const Authentication = require('./Authentication');
const LocalAuthStrategy = require('./strategies/local');

class AuthService extends Service {
    constructor() {
        super('auth');
    }

    async login({ email, username, password }) {
        const auth = new Authentication(LocalAuthStrategy, [this.usersService]);
        return auth.authenticate({
            username,
            password,
            email,
        });
    }

    async register(userData) {
        const user = await this.usersService.create(userData);
        return user;
    }
}

ServiceRegistry.registerService('auth', AuthService, ['users']);

module.exports = new AuthService();
