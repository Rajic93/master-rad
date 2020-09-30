
const express = require('express');
const { Book } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const created = await Book.create({
    title: 'Test',
    authors: 'Neca i Aca',
    year: 2020,
    language_code: 'rs',
    publisher: 'Laguna',
  });

  res.status(200).send(created);
});

module.exports = router;
