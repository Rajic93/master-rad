const sequelize = require('sequelize');
const https = require('https');
const _ = require('lodash');
const axios = require('axios');
const { BookRating, Book, AppsConfig } = require('../models');
const cache = require('./cache');
const { getAllNeighbours } = require('./neighbours');
const { consume } = require('./Events');

const agent = new https.Agent({ rejectUnauthorized: false })

const getCachedResults = async (query) => {
  const tag = `${query.type}-${query.id}-${query.additional}`;
  const rawResults = await cache.get(tag);
  console.log({ tag })
  return JSON.parse(rawResults);
}

const processResults = async (artefacts, query) => {
  if (!query) {
    return artefacts;
  }
  // prepare cache
  const tag = `${query.type}-${query.id}-${query.additional}`;
  const content = JSON.stringify(artefacts);
  // save cache
  const expiryPolicy = await cache.set(tag, content);
  console.log('Expires in', expiryPolicy);

  return artefacts;
};

const handlePromise = async (fn = e => e) => {
    try {
      const res = await fn();
      return res;
    } catch (error) {
      console.log({ error })
      return null
    }
}

const getArtefacts = async (type, id, queryParams) => {
  const additional = queryParams ? [...queryParams] : [];
  const cacheQuery = { type, id, additional: additional.join(',') };
  const cached = await getCachedResults(cacheQuery);
  if (cached) {
    return cached;
  }

  let results = {};
  if (type === 'history') {
    results = await getHistory(...queryParams);
  }
  if (type === 'hood') {
    results = await getClusterRecommendations(...queryParams);
  }
  if (type === 'personal') {
    results = await getSimilarRecommendations(...queryParams);
  }

  return processResults(results, cacheQuery);
};

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

const getClusterRecommendations = async (clusterId, hoodLimit = 10, hoodPage = 0) => {
    let recommendations = { count: 0, rows: [] };
    if (clusterId) {
      const neighbours = await getAllNeighbours(clusterId);

      recommendations = await Book.findAndCountAll({
        include: [
          {
            model: BookRating,
            as: 'bookToBookRating',
            attributes: ['rating', 'user_id'],
            where: {
              user_id: { [sequelize.Op.in]: neighbours },
              rating: { [sequelize.Op.gte]: 6 }
            },
          }
        ],
      });
      console.log({ recommendations })
    }

    return recommendations;
};

const getSimilarRecommendations = async (userId, userLimit = 10, userPage = 0) => {
    const nnConfig = await AppsConfig.findOne({ where: { application: 'artefacts_service', key: 'nn_base_url' } }); 
    const nnBaseUrl = nnConfig.dataValues.value;
    console.log({ nnBaseUrl })
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
          `${nnBaseUrl}/recommend`,
          {
            params: { title  },
            httpsAgent: agent,
          },
        )));
    
        const rawResults = await Promise.all(promises);
        const results = rawResults.map((r) => r && r.data).filter(e => e).reduce((acc, curr) => {
          const resAcc = [
            ...acc,
            ...curr.filter(([title]) => !titles.find((t) => _.toLower(t) === _.toLower(title))),
          ];
          return resAcc;
        }, []);
        const mapBook = {};
        for (const result of results) {
          mapBook[result[0]] = { similarity: result[1] };
        }
        console.log({ mapBook })
        const books = await Book.findAll({ where: { title: Object.keys(mapBook) } });

        recommendations.count = results.length;
        recommendations.rows = _.map(_.filter(_.map(books, b=> b.dataValues), b => b), (b) => ({
          ...b,
          similarity: mapBook[b.title].similarity,
        }));
    }
    return recommendations;
}
const handleInvalidateCache = async (data) => {
  console.log(data)
  if (data.type === 'invalidate-cache') {
    cache.invalidate();
  }
}

const setupListeningServices = () => {
  console.log('Setting up listeners')
  consume(handleInvalidateCache)
};

module.exports = {  getArtefacts, setupListeningServices }