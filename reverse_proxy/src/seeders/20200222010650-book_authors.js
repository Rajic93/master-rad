'use strict';

const { Authors, Books } = require('../models');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    let authors = await Authors.findAll({
      where: {
        // signature: '69350330-535c-4244-974b-b35e61929235',
      },
      attributes: ['id', 'signature'],
      raw: true,
    });
    authors = (authors || []).reduce((acc, author) => {
      !acc[author.signature] && (acc[author.signature] = author.id);
      return acc;
    }, {});
    const books = await Books.findAll({
      attributes: ['id', 'author_signature'],
      raw: true,
    });
    const bookAuthors = books.reduce((acc, { id, author_signature: authorSignature }) => {
      const authorId = authors[authorSignature];
      authorId && acc.push({
        author_id: authorId,
        book_id: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return acc;
    }, []);
    return queryInterface.bulkInsert('books_authors', bookAuthors);
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
