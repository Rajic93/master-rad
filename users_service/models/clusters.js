
const Sequelize = require('sequelize');

class Cluster extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        label: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        level: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
        },
        scope: {
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: 'default',
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        tableName: 'clusters',
        timestamps: false,
        // createdAt: 'created_at',
        // deletedAt: 'deleted_at',
        // updatedAt: 'updated_at',
        // paranoid: true,
        sequelize
      },
    )
  }
}

module.exports = Cluster;
