
const { Model } = require('sequelize');

class EmailTemplates extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
            },
            app: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            content: {
              type: DataTypes.STRING,
              allowNull: false,
            },
        }, {
            tableName: 'email_templates',
            sequelize,
        });
    }
}