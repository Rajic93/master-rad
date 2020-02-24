
const express = require('express');
const router = express.Router();
// const { EmailsService } = require('../services');
const AuthService = require('../services/auth');
// console.log({ EmailsService })
// const emailService = new EmailsService();

router.post('/login', async ({ body: { username, password } }, res) => {
  try {
    const signedData = await AuthService.login({ username, password });
    res.status(200).send(signedData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.post('/register', async (req, res) => {
  try {
    // await emailService.sendEmail({
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
