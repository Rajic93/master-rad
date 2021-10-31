
const AuthService = require('./AuthService');
const LocalAuthStrategy = require('./strategies/local');

class Auth {
    async login({ username, password }) {
        this.authService = new AuthService(LocalAuthStrategy);

        return this.authService.authenticate({
            username,
            password,
        });
    }

    async register(userData) {
        
    }
}

module.exports = new Auth;
