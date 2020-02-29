
const Service = require('../Service');
const serviceRegistry = require('../ServiceRegistry');

class AuthService extends Service {
    constructor(Strategy) {
        super('auth');
        typeof Strategy === 'function' && (this.strategy = new Strategy(this.usersService));
    }

    async authenticate(credentials) {
        return this.strategy.authenticate(credentials);
    }

    async authorize(user, route) {
        return this.strategy.authorize(user, route);
    }
}

serviceRegistry.registerService('auth', AuthService, ['users']);

module.exports = AuthService;
