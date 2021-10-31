
const Sequelize = require('sequelize');

class MoviesGenres extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: false,
            },
            movie_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'movies',
                    key: 'id',
                },
                allowNull: false,
            },
        }, {
            tableName: 'movies_genres',
            sequelize,
        });
    }
};

module.exports = MoviesGenres;
