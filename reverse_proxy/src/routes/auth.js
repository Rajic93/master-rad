
const express = require('express');
const router = express.Router();
const { Auth, Emails } = require('../services');

router.post('/login', async ({ body: { username, password } }, res) => {
  try {
    const signedData = await Auth.login({ username, password });
    res.status(200).send(signedData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.post('/register', async (req, res) => {
  try {

    // await Emails.sendEmail({
    //   "sender": "aleksandar.v.rajic@gmail.com",
    //   "recipient": "rtest@mailinator.com",
    //   "subject": "Proba",
    //   "content": "Test from external service"
    // });
    res.status(200).send({
      "sender": "aleksandar.v.rajic@gmail.com",
      "recipient": "rtest@mailinator.com",
      "subject": "Proba",
      "content": "Test from external service"
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get('/forgot-password', async () => {});

router.post('/reset-password', async () => {});

router.get('/set-password', async () => {});

module.exports = router;
