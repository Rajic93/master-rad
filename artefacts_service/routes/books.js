
const express = require('express');
const sequelize = require('sequelize');
const { BookRating, Book, User } = require('../models');
const _ = require('lodash');
const axios = require('axios');

const router = express.Router();

const handlePromise = async (fn = e => e) => {
  try {
    const res = await fn();
    return res;
  } catch (error) {
    return null
  }
} 

router.get('/', async (req, res) => {
  const { query: { hoodLimit = 10, hoodPage = 0, userLimit = 10, userPage = 0, clusterId, userId, withSimilarities } = {} } = req;

  // instead of just fetching, use books from users from cluster
  // 1. get all user ids and books from the cluster
  let hoodRecommendations = { count: 0, rows: [] };
  const where = {};
  if (clusterId) {
    where.cluster_label = clusterId;
    const neighbours = await User.findAll({ where,  attributes: ['id'] });
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
    hoodRecommendations = {
      count: neightboursBooks.count,
      rows: pagginatedHood,
    }
  }

  // 2. get all books similart to the 
  let yourRecommendations = { count: 0, rows: [] };
  const wh = {};

  if (userId) {
    wh.include = [
      {
        model: BookRating,
        as: 'bookToBookRating',
        where: {
          user_id: userId,
          rating: { [sequelize.Op.gte]: 6 }
        },
      }
    ];
    const likedBooks = await Book.findAndCountAll(wh);

    // 3. Call NN for similar books
  
    const start = Number.parseInt(userPage, 10) * Number.parseInt(userLimit, 10);
    const end = start + Number.parseInt(userLimit, 10);

    const titles = likedBooks.rows.map(book => book.title);

    // TODO: add cache here

    const promises = titles.map((title) => handlePromise(() => axios.get(
      'http://localhost:5001/recommend',
      { params: { title  } },
    )));

    const rawResults = await Promise.all(promises);

    const results = rawResults.map(({ data }) => data).filter(e => e).reduce((acc, curr) => {
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
      yourRecommendations = {
        count: likedBooks.count,
        rows: results,
      };
    } else {
      let finalRes = results;
      const promissesBooks = Object.values(results).map(titles => Book.findAll({ where: { title: { [sequelize.Op.in]: titles } } }));
      try {
        const res = await Promise.all(promissesBooks);
        
        finalRes = res.reduce((acc, vals, index) => {
          const title = Object.keys(results)[index];
          acc[title] = vals;
          return acc;
        }), {};
      } catch (e) {

      }

      yourRecommendations = {
        count: likedBooks.count,
        rows: finalRes,
      };
    }
  }


  res.status(200).send({
    yourRecommendations,
    hoodRecommendations,
  });
});

router.get('/samples', async (req, res) => {
  // return 10 books from different genres
  const samples = [
    {
      "id": 639882,
      "title": "Frankenstein (Illustrated Classics Series)"
    },
    {
      "id": 548218,
      "title": "Classical Mythology"
    },
    {
      "id": 548221,
      "title": "Flu: The Story of the Great Influenza Pandemic of 1918 and the Search for the Virus That Caused It"
    },
    {
      "id": 548354,
      "title": "Through Wolf's Eyes (Wolf)"
    },
    {
      "id": 548257,
      "title": "To Kill a Mockingbird"
    },
    {
      "id": 548266,
      "title": "Getting Well Again"
    },
    {
      "id": 548272,
      "title": "The Dragons of Eden: Speculations on the Evolution of Human Intelligence"
    },
    {
      "id": 548398,
      "title": "Memoirs of a Geisha"
    },
    {
      "id": 548424,
      "title": "Life of Pi"
    }
  ]
  // const books = await Book.findAll({ limit: 10 });
  res.status(200).send(samples);
});

router.post('/', async (req, res) => {
  const created = await Book.create(req.body);

  res.status(200).send(created);
});

router.post('/bulk-rate', async (req, res) => {

  const { body: { userId, ...ratings } = {} } = req;

  const instances = Object.entries(ratings).map(([key, value]) => ({
    book_id: key,
    rating: value,
    user_id: userId,
  }));

  const created = await BookRating.bulkCreate(instances)

  console.log(created);
  res.status(200).send('Success');
});

router.post('/rate', async (req, res) => {
  const {
    entityId,
    rating,
    userId,
  } = req.body;

  // const userId = req.user.id;

  // create rating
  await BookRating.create({
    book_id: entityId,
    user_id: userId,
    rating,
  })

  //update Book rating
  // const book = await Book.findByPk(entityId, { attributes: ['average_rating', 'ratings_count'] });
  // const avg = Number.parseFloat(book.get('average_rating') || 0);
  // const count = Number.parseFloat(book.get('ratings_count') || 0);
  // const averageRating = (avg * count + rating)/ (count + 1);
  // await Book.update(
  //   {
  //     average_rating: averageRating,
  //     ratings_count: count + 1,
  //   },
  //   { where: { id: entityId } },
  // )

  return res.status(200).send('Success');
})

module.exports = router;
