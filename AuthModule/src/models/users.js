
const { Model } = require('sequelize');

class Users extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
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
            },
            {
                tableName: 'users',
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
