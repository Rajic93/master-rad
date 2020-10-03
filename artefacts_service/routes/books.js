
const express = require('express');
const { BookRating, Book } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.findAll();

  res.status(200).send(books);
});

router.post('/', async (req, res) => {
  const created = await Book.create(req.body);

  res.status(200).send(created);
});

router.post('/rate', async (req, res) => {

  res.status(200).send(req.body);
});

router.put('/rate', async (req,res) => {
  const {
    entityId,
    rating,
  } = req.query;

  const userId = req.user.id;

  // create rating
  await BookRating.create({
    id: entityId,
    userId,
    rating,
  })

  //update Book rating
  const book = await Book.findByPk(entityId, { attributes: ['average_rating', 'ratings_count'] });
  const avg = Number.parseFloat(book.get('average_rating') || 0);
  const count = Number.parseFloat(book.get('ratings_count') || 0);
  const averageRating = (avg * count + rating)/ (count + 1);
  await Book.update(
    {
      average_rating: averageRating,
      ratings_count: count + 1,
    },
    { where: { id: entityId } },
  )

  return req.status(200).send('Success');
})

module.exports = router;
