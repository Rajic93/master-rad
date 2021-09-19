const sequelize = require('sequelize');
const _ = require('lodash');
const axios = require('axios');
const { BookRating, Book, User } = require('../models');

const handlePromise = async (fn = e => e) => {
    try {
      const res = await fn();
      return res;
    } catch (error) {
      return null
    }
}

const getHistory = async (userId, limit, offset) => {
  const ratings = await BookRating.findAll({ where: { user_id: Number.parseInt(userId, 10) }, attributes: ['book_id', 'rating'] });
  const ids = _.map(Array.from(new Set(ratings)), (r) => r.book_id);
  if (!ids || ids.length === 0) {
    return {
      count: 0,
      rows: [],
    };
  }

  const books = await Book.findAndCountAll({
    where: { id: ids },
    limit,
    offset,
  })
  books.rows = _.map(books.rows, (book) => {
    const found = _.find(ratings, (r) => Number.parseInt(r.book_id, 10) === Number.parseInt(book.id, 10));

    return {
      ...book.dataValues,
      rating: found ? Number.parseFloat(found.rating) : 0,
    };
  });

  return books;
}

const getClusterRecommendations = async ({ hoodLimit = 10, hoodPage = 0, clusterId }) => {
    let recommendations = { count: 0, rows: [] };
    if (clusterId) {
      const where = { cluster_label: clusterId };
      const neighbours = await User.findAll({ where, attributes: ['id'] });
      const ids = neighbours.map(neighbour => neighbour.id);

      const neightboursBooks = await Book.findAndCountAll({
        include: [
          {
            model: BookRating,
            as: 'bookToBookRating',
            where: {
              user_id: { [sequelize.Op.in]: ids },
              rating: { [sequelize.Op.gte]: 6 }
            },
          }
        ],
      });

      let start = Number.parseInt(hoodPage, 10) * Number.parseInt(hoodLimit, 10);
      let end = start + Number.parseInt(hoodLimit, 10);
      const pagginatedHood = _.slice(neightboursBooks.rows, start, end);
      recommendations = {
        count: neightboursBooks.count,
        rows: pagginatedHood,
      }
    }

    return recommendations;
};

const getSimilarRecommendations = async ({ userLimit = 10, userPage = 0, userId, withSimilarities }) => {
    let recommendations = { count: 0, rows: [] };
    if (userId) {
        const likedBooks = await Book.findAndCountAll({
          include: [{
              model: BookRating,
              as: 'bookToBookRating',
              where: {
                  user_id: userId,
                  rating: { [sequelize.Op.gte]: 6 }
              },
          }]
        });
    
        // 3. Call NN for similar books
      
        const start = Number.parseInt(userPage, 10) * Number.parseInt(userLimit, 10);
        const end = start + Number.parseInt(userLimit, 10);
    
        const titles = likedBooks.rows.map(book => book.title);
        console.log({ titles })
    
        // TODO: add cache here
    
        const promises = titles.map((title) => handlePromise(() => axios.get(
          'http://localhost:5000/recommend',
          { params: { title  } },
        )));
    
        const rawResults = await Promise.all(promises);
        console.log({ rawResults })
        const results = rawResults.filter(e => e).map(({ data }) => data).filter(e => e).reduce((acc, curr) => {
          if (!curr[0] || !curr[0][0]) {
            return acc;
          }
          if (withSimilarities) {
            acc[curr[0][0]] = curr.slice(1);
          } else {
            acc[curr[0][0]] = curr.slice(1).map(b => b[0]);
          }
          return acc;
        }, {});
        
        if (withSimilarities) {
            recommendations = {
            count: likedBooks.count,
            rows: results,
          };
        } else {
          let finalRes = results;
          let raw = []
          const promissesBooks = Object.values(results).map(titles => Book.findAll({ where: { title: { [sequelize.Op.in]: titles } } }));
          try {
            const res = await Promise.all(promissesBooks);
            
            finalRes = res.reduce((acc, vals, index) => {
              const title = Object.keys(results)[index];
              acc.push({
                ...vals,
                title,
              });
              return acc;
            }, []);
            raw = _.union(...res);
          } catch (e) {
    
          }
    
          recommendations = {
            count: raw.length,
            raw,
            rows: finalRes,
          };
        }
    }
    return recommendations;
}

module.exports = {
    getClusterRecommendations,
    getSimilarRecommendations,
    getHistory,
}