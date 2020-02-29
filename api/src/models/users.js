
const Sequelize = require('sequelize');

class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: true
      },
      register_token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      forgot_password_token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      longitude: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      tableName: 'users',
      sequelize,
    });
  }

  static associate({ Books, BooksRatings }) {
    this.books = this.belongsToMany(Books, { through: BooksRatings });
  }
}

module.exports = Users;


