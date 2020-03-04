
const { Model } = require('sequelize');

class Authors extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            signature: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            tableName: 'authors',
            sequelize,
        });
    }

    static associate({ Books, BooksAuthors }) {
        this.authorsBooks = this.belongsToMany(
            Books,
            {
                foreignKey: 'author_id',
                through: BooksAuthors,
            },
        );
    }
}

module.exports = Authors;
