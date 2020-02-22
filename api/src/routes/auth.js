
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {

  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.post('/register', async (req, res) => {
  try {

  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
