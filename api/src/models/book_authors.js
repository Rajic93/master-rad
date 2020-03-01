
const Sequelize = require('sequelize');

class BooksAuthors extends Sequelize.Model {
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
            book_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'books',
                    key: 'id',
                },
                allowNull: false,
            },
        }, {
            tableName: 'books_authors',
            sequelize,
        });
    }
};

module.exports = BooksAuthors;
