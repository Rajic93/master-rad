
const Sequelize = require('sequelize');

class Books extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING },
      year: { type: DataTypes.INTEGER },
      average_rating: { type: DataTypes.DECIMAL(3, 2) },
      no_of_ratings: { type: DataTypes.INTEGER },
    }, {
      tableName: 'books',
      sequelize,
    });
  }

  static associate({
    Authors,
    BooksAuthors,
    BooksGenres,
    BooksRatings,
    Genres,
    Users,
  }) {
    this.ratings = this.belongsToMany(Users, { through: BooksRatings });
    this.author = this.belongsToMany(Authors, { through: BooksAuthors });
    this.genres = this.belongsToMany(Genres, { through: BooksGenres });
  }
}

module.exports = Books;
