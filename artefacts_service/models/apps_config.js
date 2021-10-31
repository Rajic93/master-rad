
const Sequelize = require('sequelize');

class AppsConfig extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
        },
        application: {
          type: Sequelize.STRING,
        },
        key: {
          type: Sequelize.STRING,
        },
        value: {
          type: Sequelize.STRING,
        }
      },
      {
        tableName: 'apps_config',
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: 'deleted_at',
        // paranoid: true,
        sequelize,
      },
    );
  }
}

module.exports = AppsConfig;
