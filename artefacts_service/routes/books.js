
const express = require('express');
const { BookRating, Book, User } = require('../models');
const { getClusterRecommendations, getSimilarRecommendations } = require('../services');

const router = express.Router();


router.get('/', async (req, res) => {
  const { query: { hoodLimit = 10, hoodPage = 0, userLimit = 10, userPage = 0, userId, withSimilarities } = {} } = req;

  // instead of just fetching, use books from users from cluster
  // 1. get all user ids and books from the cluster
  const user = await User.findOne({ where: { id: userId } });
  const hoodRecommendations = await getClusterRecommendations({ hoodLimit, hoodPage, clusterId: user.cluster_label });
  
  // 2. get all books similart to the 
  const yourRecommendations = await getSimilarRecommendations({ userLimit, userPage, userId, withSimilarities });
  
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
