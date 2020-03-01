
const express = require('express');
const router = express.Router();
const { Users } = require('../services');


router.get('/info', async (
  { user: { id } },
  res,
) => {
  try {
    const info = await Users.findById(id);
    if (!info) {
      return res.status(404).send('User not found.');
    }
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get('/movies', async (
  { user: { id } },
  res,
) => {
  try {
    const movies = await Users.findUserMovies(id);
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get('/books', async (
  { user: { id } },
  res,
) => {
  try {
    const books = await Users.findUserBooks(id);
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.put('/update', async (
  {
    body,
    user: { id },
  },
  res,
) => {
  try {
    const updatedUser = await Users.update({
      id,
      ...body,
    });
    if (!updatedUser) {
      return res.status(404).send('User not found.');
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.delete('/delete', async (
  { user: { id } },
  res,
) => {
  try {
    const deactivatedUser = await Users.deactivate(id);
    if (!deactivatedUser) {
      return res.status(404).send('User not found.');
    }
    res.status(200).send(id);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
