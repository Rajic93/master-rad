
const Sequelize = require('sequelize');
const Service = require('../Service');
const serviceRegistry = require('../ServiceRegistry');
const { Users } = require('../../models');

class UsersService extends Service {
    constructor(UserModel) {
        super('users');
        this.usersModel = UserModel;
    }

    async findByUsername(username) {
        return Users.findOne({ where: { username } });
    }

    async findByEmail(email) {
        return Users.findOne({ where: { email } });
    }

    async findByEmailOrUsername(email, username) {
        if (!email && !username) {
            throw new Error('Provide email or username');
        }
        const where = {};
        email && username && (where[Sequelize.Op.or] = {
            email,
            username,
        })
        email && !username && (where.email = email);
        username && !email && (where.username = username);

        return Users.findOne({ where });
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
        const user = await Users.findOne({
            where: { id },
            attributes: [],
            include: [{ models: 'movies' }],
        });
        return user.get('movies');
    }

    async findUserBooks(id) {
        const user = await Users.findOne({
            where: { id },
            attributes: [],
            include: [{ models: 'books' }],
        });
        return user.get('books');
    }

    async create(user) {
        const existingUser = await Users.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new Error('User already exists');
        }
        return Users.create(user);
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

serviceRegistry.registerService('users', UsersService, ['movies', 'books']);

module.exports = UsersService;
