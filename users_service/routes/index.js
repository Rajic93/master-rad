
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('hellloooooo');
})

router.get('/:id', (req, res) => {
  res.status(200).send(req.params.id);
})

router.get('/body/parse', (req, res) => {
  console.log({ body: req.body})
  res.status(200).send(req.body);
})

module.exports = router;
