
const Sequelize = require('sequelize');

class BooksGenres extends Sequelize.Model {
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
            book_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'books',
                    key: 'id',
                },
                allowNull: false,
            },
        }, {
            tableName: 'books_genres',
            sequelize,
        });
    }
};

module.exports = BooksGenres;
