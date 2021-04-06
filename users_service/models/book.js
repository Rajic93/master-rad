const Sequelize = require('sequelize');

class Book extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                book_name: {
                  type: DataTypes.TEXT,
                  allowNull: false,
                },
                book_description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                avg_rating: {
                    type: DataTypes.DECIMAL(3, 2),
                    allowNull: true,
                },
            }, 
            {
              tableName: 'books',
              timestamps: false,
              // createdAt: 'created_at',
              // deletedAt: 'deleted_at',
              // updatedAt: 'updated_at',
              // paranoid: true,
              sequelize
            },
        );
    }
}

module.exports = Book;
