
const Service = require('../Service');
const { registerService } = require('../registry');
const { Users } = require('../../models');

class UsersService extends Service {
    constructor(UserModel) {
        super('users');
        this.usersModel = UserModel;
    }

    async findByUsername(username) {
        return Users.findOne({ where: { username } });
    }

    async findById(id) {
        const user = await Users.findById(id);
        if (!user) {
            return null;
        }
        return {
            'id': user.get('id'),
            'first_name': user.get('first_name'),
            'last_name': user.get('last_name'),
            'username': user.get('username'),
            'email': user.get('email'),
            'city': user.get('city'),
            'country': user.get('country'),
            'age': user.get('age'),
            'latitude': user.get('latitude'),
            'longitude': user.get('longitude'),
        };
    }

    async findUserMovies(id) {
        return this.moviesService.findByUserId(id);
    }

    async findUserBooks(id) {
        return this.booksService.findByUserId(id);
    }

    async update({
      id,
      ...data
    }) {
        const user = await Users.findById(id);
        if (!user) {
            return null;
        }
        await user.update({ ...data });
        return user;
    }

    async deactivate(id) {
        return this.update({
            id,
            status: 2,
            password: null,
            salt: null,
        });
    }
}

registerService('users', UsersService, ['movies', 'books']);

module.exports = UsersService;
