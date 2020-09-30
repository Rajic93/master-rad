
const { Users } = require('../../../repositories');

class LocalStrategy {
    static async login({
        identifier,
        password,
    }, userModel) {
        const model = userModel || Users;

        if (!model) {
            throw new Error('User model is not provided');
        }

        const user = await Users.findByIdentifier(identifier);
        if (!user) {
            return {
                error: 'auth.invalid_credentials',
                status: 400,
            };
        }

        const isPasswordValid = await this.validatePassword(user, password);
        if (!isPasswordValid) {
            return {
                error: 'auth.invalid_credentials',
                status: 400,
            };
        }
        
        return {
            ...this.signUser(user),
            status: 200,
        };
    }

    static async validatePassword(user, password) {
        return user.password === password;
    }

    static async signUser(user = {}) {
        return {
            user,
            token: {},
            refreshToken: {},
        };
    }
}

module.exports = LocalStrategy;
