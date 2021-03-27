
const Sequelize = require('sequelize');

class BookRating extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
        },
        book_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          // references: {
          //   model: 'Book',
          //   key: 'id',
          //   as: 'book_rating',
          // },
        },
        user_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
        },
        rating: { type: DataTypes.DECIMAL(5, 2) },
      },
      {
        tableName: 'ratings',
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: 'deleted_at',
        // paranoid: true,
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Book, {
      foreignKey: 'book_id',
      as: 'bookRatingToBook'
    });
  }
}

module.exports = BookRating;
