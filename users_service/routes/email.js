
const express = require('express');
const router = express.Router();
const EmailService = require('../services/Email');

router.post('/', async (req, res) => {
  const email = req.body;

  await EmailService.send(email);

  res.status(200).send('success');
});

module.exports = router;
