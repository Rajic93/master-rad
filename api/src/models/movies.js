
const Sequelize = require('sequelize');

class Movies extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING },
      author_id: {
        type: DataTypes.INTEGER,
        references: 'authors',
        key: 'id',
      },
      year: { type: DataTypes.INTEGER },
      rating: { type: DataTypes.INTEGER },
      genre_id: {
        type: DataTypes.STRING,
        references: 'genres',
        key: 'id',
      },
    }, {
      tableName: 'movies',
      sequelize,
    });
  }
}

module.exports = Movies;
