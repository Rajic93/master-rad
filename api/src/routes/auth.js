
const express = require('express');
const router = express.Router();
const { Auth, Emails } = require('../services');

router.post('/login', async ({ body: { email, username, password } }, res) => {
  try {
    const signedData = await Auth.login({ email, username, password });

    res.status(200).send(signedData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await Auth.register(req.body);

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get('/forgot-password', async (
  { body: { email } },
  res,
) => {
  
});

router.post('/reset-password', async () => {});

router.get('/set-password', async () => {});

module.exports = router;
