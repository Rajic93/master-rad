
const { Model } = require('sequelize');

class Genres extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        }, {
            tableName: 'genres',
            sequelize,
        });
    }

    static associate({ Books, BooksGenres }) {
        this.books = this.belongsToMany(Books, { through: BooksGenres });
    }
}

module.exports = Genres;
