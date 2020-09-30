
const LocalStrategy = require('./strategies/Local');

class Authentication {
    strategy;
    
    constructor(strategy = LocalStrategy) {
        this.strategy = strategy;
    }

    async login(credentials) {
        return this.strategy.login(credentials);
    }
}

module.exports = Authentication;
