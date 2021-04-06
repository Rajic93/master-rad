
const Sequelize = require('sequelize');

class Book extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
        },
        isbn: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        authors: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        year: {
          type: DataTypes.INTEGER(4),
          allowNull: true,
        },
        // language_code: {
        //   type: DataTypes.STRING(10),
        //   allowNull: true,
        // },
        average_rating: {
          type: DataTypes.DECIMAL(3, 2),
          allowNull: false,
          defaultValue: 0,
        },
        // ratings_count: {
        //   type: DataTypes.INTEGER(6),
        //   allowNull: false,
        //   defaultValue: 0,
        // },
        // ratings_1: {
        //   type: DataTypes.INTEGER(6),
        //   allowNull: false,
        //   defaultValue: 0,
        // },
        // ratings_2: {
        //   type: DataTypes.INTEGER(6),
        //   allowNull: false,
        //   defaultValue: 0,
        // },
        // ratings_3: {
        //   type: DataTypes.INTEGER(6),
        //   allowNull: false,
        //   defaultValue: 0,
        // },
        // ratings_4: {
        //   type: DataTypes.INTEGER(6),
        //   allowNull: false,
        //   defaultValue: 0,
        // },
        // ratings_5: {
        //   type: DataTypes.INTEGER(6),
        //   allowNull: false,
        //   defaultValue: 0,
        // },
        publisher: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        image_url_s: {
          type: DataTypes.STRING(1024),
          allowNull: true,
        },
        image_url_m: {
          type: DataTypes.STRING(1024),
          allowNull: true,
        },
        image_url_l: {
          type: DataTypes.STRING(1024),
          allowNull: true,
        },
      },
      {
        tableName: 'books',
        timestamps: false,
        freezeTableName: true,
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.BookRating, {
      foreignKey: 'book_id',
      as: 'bookToBookRating'
    });
  }
}

module.exports = Book;
