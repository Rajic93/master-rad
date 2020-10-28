
const Sequelize = require('sequelize');

class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM(['regular', 'admin']),
          allowNull: false,
          defaultValue: 'regular',
        },
        status: {
          type: DataTypes.INTEGER(3),
          allowNull: false,
          defaultValue: 0,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        salt: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER(2),
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        country: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        profession: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        lat: {
          type: DataTypes.DECIMAL(8, 6),
          allowNull: true,
        },
        lng: {
          type: DataTypes.DECIMAL(9, 6),
          allowNull: true,
        },
        activation_token: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        activation_token_expiry: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        password_token: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        password_token_expiry: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        refresh_token: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        super_admin_token: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        cluster_label: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
      },
      {
        modelName: 'User',
        timestamps: true,
        createdAt: 'created_at',
        deletedAt: 'deleted_at',
        updatedAt: 'updated_at',
        paranoid: true,
        sequelize
      },
    )
  }
}

module.exports = Users;
