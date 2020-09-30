
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
        title: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        authors: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER(4),
          allowNull: false,
        },
        language_code: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        average_rating: {
          type: DataTypes.DECIMAL(3, 2),
          allowNull: false,
          defaultValue: 0,
        },
        ratings_count: {
          type: DataTypes.INTEGER(6),
          allowNull: false,
          defaultValue: 0,
        },
        ratings_1: {
          type: DataTypes.INTEGER(6),
          allowNull: false,
          defaultValue: 0,
        },
        ratings_2: {
          type: DataTypes.INTEGER(6),
          allowNull: false,
          defaultValue: 0,
        },
        ratings_3: {
          type: DataTypes.INTEGER(6),
          allowNull: false,
          defaultValue: 0,
        },
        ratings_4: {
          type: DataTypes.INTEGER(6),
          allowNull: false,
          defaultValue: 0,
        },
        ratings_5: {
          type: DataTypes.INTEGER(6),
          allowNull: false,
          defaultValue: 0,
        },
        publisher: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        image_url: {
          type: DataTypes.STRING(1024),
          allowNull: true,
        },
      },
      {
        modelName: 'Book',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
        sequelize,
      },
    );
  }
}

module.exports = Book;
