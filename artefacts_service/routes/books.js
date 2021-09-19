const express = require('express');
const Sequelize = require('sequelize');
const { BookRating, Book, User } = require('../models');
const { getClusterRecommendations, getSimilarRecommendations, getHistory } = require('../services');

const router = express.Router();


router.get('/', async (req, res) => {
  const { query } = req;
  const { userId, withSimilarities, phrase } = query || {}

  const offset = Math.max(Number.parseInt(query && query.page || 0, 10) - 1, 0) * Number.parseInt(query.pageSize || 10, 10);

  // instead of just fetching, use books from users from cluster
  // 1. get all user ids and books from the cluster
  if (!userId) {
    return res.status(200).send({
      rows: [],
      count: 0,
    });
  }

  const bookQuery = {};
  if (phrase && phrase.length > 0) {
    bookQuery[Sequelize.Op.or] = [
      { title: { [Sequelize.Op.like]: `%${phrase}%` } },
      { authors: { [Sequelize.Op.like]: `%${phrase}%` } },
      { id: phrase },
      { isbn: phrase },
    ];
  }

  const user = await User.findOne({ where: { id: userId } });

  if (query && query.isHistory) {
    const history = await getHistory(userId, Number.parseInt(query.pageSize || 10, 10), offset)
    return res.status(200).send(history);
  }

  if (query && query.isHood) {
    const hoodRecommendations = await getClusterRecommendations({ hoodLimit: Number.parseInt(query && query.pageSize || 0, 10), hoodPage: Math.max(Number.parseInt(query && query.page || 0, 10) - 1, 0), clusterId: user.cluster_label });
    return res.status(200).send(hoodRecommendations);
  }
  
  // 2. get all books similart to the 
  if (query && query.isPersonal) {
    const yourRecommendations = await getSimilarRecommendations({ userLimit: Number.parseInt(query && query.pageSize || 0, 10), userPage:  Math.max(Number.parseInt(query && query.page || 0, 10) - 1, 0), userId, withSimilarities, bookQuery });
    console.log({ yourRecommendations })
    return res.status(200).send(yourRecommendations);
  }


  const results = await Book.findAndCountAll({ where: bookQuery, offset, limit: Number.parseInt(query.pageSize || 10, 10) })
  return res.status(200).send(results);
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

  const found = await BookRating.findOne({
    where: {
      book_id: Number.parseInt(entityId, 10),
      user_id: Number.parseInt(userId, 10),
    }
  })

  if (!found) {
    // create rating
    await BookRating.create({
      book_id: entityId,
      user_id: userId,
      rating,
    });
  } else {
    await BookRating.update(
      { rating },
      {
        where: {
          book_id: entityId,
          user_id: userId,
        },
      },
    );
  }

  //update Book rating
  const book = await Book.findByPk(entityId, { attributes: ['average_rating', 'ratings_count'] });
  const avg = Number.parseFloat(book.get('average_rating') || 0);
  const count = Number.parseFloat(book.get('ratings_count') || 0);
  const averageRating = (avg * count + rating) / (count + 1);
  await Book.update(
    {
      average_rating: averageRating,
      ratings_count: count + 1,
    },
    { where: { id: entityId } },
  )

  return res.status(200).send('Success');
})

module.exports = router;
