
const jwt = require('../../../utilities/jwt');
const { encrypt } = require('../../../utilities/encryption');

class LocalAuth {
    constructor(usersService) {
        this.usersService = usersService;
    }

    authenticate({ username, password }) {
        const user = this.usersService.findByUsername(username);
        if (!user) {
            throw new Error('Username or password not valid');
        }

        const salt = user.get('salt');
        const encrPassword = encrypt(password, salt);

        if (encrPassword !== password) {
            throw new Error('Username or password not valid');
        }

        return this.signData({ id: user.get('id') });
    }

    signData(data) {
        return { token: jwt.sign(data) };
    }
}

module.exports = LocalAuth;
