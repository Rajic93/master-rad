
const Sequelize = require('sequelize');

class EmailTemplate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
        },
        template_id: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        provider_url: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        params: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        tableName: 'email_templates',
        modelName: 'EmailTemplate',
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

module.exports = EmailTemplate;
