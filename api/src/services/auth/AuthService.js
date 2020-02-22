
const Service = require('../Service');
const { registerService } = require('../registry');

class AuthService extends Service {
    constructor(Strategy) {
        super('auth');
        this.strategy = new Strategy(this.usersService);
    }

    async authenticate(credentials) {
        return this.strategy.authenticate(credentials);        
    }

    async authorize(user, route) {
        return this.strategy.authorize(user, route);    
    }
}

registerService('auth', AuthService, ['users']);

module.exports = AuthService;
