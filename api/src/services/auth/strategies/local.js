
const jwt = require('../../../utilities/jwt');
const { encrypt } = require('../../../utilities/encryption');

class LocalAuth {
    constructor(usersService) {
        this.usersService = usersService;
    }

    async authenticate({ username, password, email }) {
        const user = await this.usersService.findByEmailOrUsername(email, username);

        if (!user) {
            throw new Error('Username or password not valid');
        }

        const salt = user.get('salt');
        const encrPassword = encrypt(password, salt);

        if (encrPassword !== user.get('password')) {
            throw new Error('Username or password not valid');
        }

        return this.signData({ id: user.get('id') });
    }

    signData(data) {
        return { token: jwt.sign(data) };
    }
}

module.exports = LocalAuth;
