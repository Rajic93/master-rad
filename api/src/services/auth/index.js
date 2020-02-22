
const AuthService = require('./AuthService');
const LocalAuthStrategy = require('./strategies/local');

class Auth {
    async login(username, password) {
        this.authService = new AuthService(LocalAuthStrategy);

        const authorizedUser = await this.authService.authorize({
            username,
            password,
        });
    }
}

module.exports = Auth;
