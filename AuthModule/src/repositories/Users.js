
const Repository = require('./Repository');
const { utils } = require('./orm');
const { User } = require('../models');

class UsersRepository extends Repository {
    findByIdentifier(identifier) {
        return this.findOne({
            query: {
                username: identifier,
                email: identifier,
            },
            attributes: ['id', 'username', 'email', 'status', 'role'],
        })
    }
}

module.exports = new UsersRepository(User, utils);
