
const Sequelize = require('sequelize');

class MovieRatings extends Sequelize.Model {
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
            rating: { type: DataTypes.DECIMAL(3, 2) },
        }, {
            tableName: 'movies_ratings',
            sequelize,
        });
    }
};

module.exports = MovieRatings;
