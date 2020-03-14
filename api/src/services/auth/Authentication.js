
class Authentication {
    constructor(Strategy, servicesDependencies = []) {
        typeof Strategy === 'function' && (this.strategy = new Strategy(...servicesDependencies));
    }

    async authenticate(credentials) {
        return this.strategy.authenticate(credentials);
    }
}

module.exports = Authentication;
