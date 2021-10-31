
const Sequelize = require('sequelize');

class BooksRatings extends Sequelize.Model {
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
            rating: { type: DataTypes.DECIMAL(3, 2) },
        }, {
            tableName: 'books_ratings',
            sequelize,
        });
    }
};

module.exports = BooksRatings;
