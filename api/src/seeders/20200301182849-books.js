'use strict';

const books = require('../data/books.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('books', books.map(({
        author,
        title,
        year,
      }) => ({
        title,
        year: year || 0,
        author_signature: author,
        createdAt: new Date(),
        updatedAt: new Date(),
      })));
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
