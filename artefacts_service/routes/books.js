const express = require('express');
const Sequelize = require('sequelize');
const { BookRating, Book } = require('../models');
const { getArtefacts } = require('../services');

const router = express.Router();


router.get('/', async (req, res) => {
  const { query } = req;
  const { userId, phrase, clusterLabel } = query || {}

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

  let params = [];
  if (query && query.isHistory) {
    params = [
      'history',
      userId,
      [
        userId,
        Number.parseInt(query.pageSize || 10, 10),
        offset,
      ],
    ]
  }

  if (query && query.isHood) {
    params = [
      'hood',
      clusterLabel,
      [
        clusterLabel,
        Number.parseInt(query && query.pageSize || 0, 10),
        Math.max(Number.parseInt(query && query.page || 0, 10) - 1, 0),
      ],
    ];
  }
  
  // 2. get all books similart to the 
  if (query && query.isPersonal) {
    params = [
      'personal',
      userId,
      [
        userId,
        Number.parseInt(query && query.pageSize || 0, 10),
        Math.max(Number.parseInt(query && query.page || 0, 10) - 1, 0),
        bookQuery
      ]
    ];
  }


  if (params.length) {
    const results = await getArtefacts(...params);
    return res.status(200).send(results);
  }

  const results = await Book.findAndCountAll({ where: bookQuery, offset, limit: Number.parseInt(query.pageSize || 10, 10) })
  return res.status(200).send(results);
});

router.get('/samples', async (req, res) => {
  // return 10 books from different genres
  const samples = [
    {
      "id": 639844,
      "title": "Four Blind Mice"
    },
    {
      "id": 639917,
      "title": "White Teeth"
    },
    {
      "id": 637775,
      "title": "Amsterdam"
    },
    {
      "id": 639862,
      "title": "The Enchanted Wood"
    },
    {
      "id": 639933,
      "title": "Red Dragon"
    },
    {
      "id": 643438,
      "title": "Hannibal"
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
      "id": 549609,
      "title": "To Kill a Mockingbird"
    },
    {
      "id": 548424,
      "title": "Life of Pi"
    },
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
