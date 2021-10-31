
const Sequelize = require('sequelize');

class MoviesAuthors extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            author_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'authors',
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
            tableName: 'movies_authors',
            sequelize,
        });
    }
};

module.exports = MoviesAuthors;
