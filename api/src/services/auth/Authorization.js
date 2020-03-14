
class Authorization {
    constructor(Strategy, servicesDependencies = []) {
        typeof Strategy === 'function' && (this.strategy = new Strategy(...servicesDependencies));
    }

    async authorize(user, route) {
        return this.strategy.authorize(user, route);
    }
}

module.exports = Authorization;
