const Sequelize = require('sequelize');

class Application extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                  type: DataTypes.TEXT,
                  allowNull: false,
                },
                api_key: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                config: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
            }, 
            {
              tableName: 'applications',
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

module.exports = Application;
