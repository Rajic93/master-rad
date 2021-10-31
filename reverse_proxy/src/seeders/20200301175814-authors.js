'use strict';

const authors = require('../data/authors.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('authors', authors.map(data => ({
      ...data,
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
