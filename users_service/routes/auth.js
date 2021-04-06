const express = require('express');
const { User, EmailTemplate } = require('../models');
const EmailService = require('../services/Email');
const { sign } = require('../utilities/jwt');

const router = express.Router();

router.post('/login', async (req, res) => {
  const credentials = req.body;

  const user = await User.findOne({ where: { email: credentials.email }});
  if (!user) {
    return res.status(404).send('Username or password is not valid.');
  }

  if (user.get('status') === 0) {
    return res.status(204).send('User is not confirmed.');
  }

  const password = user.get('password');
  if (password !== credentials.password) {
    return res.status(400).send('Username or password is not valid.');
  }

  const jwtToken = sign({
    id: user.get('id'),
    status: user.get('status'),
    role: user.get('role'),
  });

  res.status(200).send({ token: jwtToken });
})

router.post('/register', async (req, res) => {
  try {
    console.log('herhehre')
    const credentials = req.body;

    const user = await User.findOne({ where: { email: credentials.email }});
    console.log({ user })
    if (user) {
      return res.status(400).send('User already exists (Jok).');
    }

    // TODO: create real token and expiration time
    const token = 'daskdasdasdmsalkdmaskldmsd';

    const toBeCreated = {
      ...credentials,
      // status: 0,
      // role: 'regular',
      // activation_token: token,
    };

    const created = await User.create(toBeCreated);

    // TODO: add to clusterization queue

    delete created.password;

    const name = `${created.get('first_name')} ${created.get('last_name')}`;
    // const email = created.get('email');
    // const emailTemplate = await EmailTemplate.findOne({
    //   where: {
    //     type: 'account_activation',
    //     status: 1,
    //   },
    // });
    // let emailStatus = -1;

    // if (emailTemplate) {
    //   const templateId = emailTemplate.get('template_id');
    //   emailStatus = await EmailService.accountActivation(email, name, token, templateId);
    // }

    res.status(200).send({
      user: created,
      // status: emailStatus === -1
      //   ? 'Failed to send activation email. Please contact support'
      //   : undefined,
    })
  } catch(error) {
    console.log({ error })
  }
})

router.get('/activate/:token', async (req,res) => {
  const { token } = req.params;

  const user = await User.findOne({ where: { activation_token: token } });
  if (!user) {
    return res.status(404).send('Not found');
  }

  //TODO: check for expiration time of the token if status === 0
  // if status === 9 then send welcome back email

  await User.update({
    status: 1,
    activation_token: null,
  }, { where: { activation_token: token } });

  res.status(200).send('success')
})

router.get('/deactivate', async (req,res) => {
  const { email } = req.body;

  // TODO: create real token and expiration time
  const token = 'daskdasdasdmsalkdmaskldmsd';

  await User.update({
    status: 9,
    activation_token: token,
  }, { where: { email } });

  const emailTemplate = await EmailTemplate.findOne({
    where: {
      type: 'account_goodbye',
      status: 1,
    },
  });
  let emailStatus = -1;

  if (emailTemplate) {
    const templateId = emailTemplate.get('template_id');
    emailStatus = await EmailService.accountDeactivation(email, name, token, templateId);
  }

  res.status(200).send(emailStatus === 1 ? 'success' : 'Failed to send Goodbye email');
})

router.post('/forgot-password', (req, res) => {
  // necemo za sada
  res.status(200).send('success')
})

router.post('/reset-password', async (req,res) => {
  const credentials = req.body;

  const user = await User.findOne({ where: { email: credentials.email }});
  if (!user) {
    return res.status(404).send('User does not exist');
  }

  await User.update({ password: credentials.password }, { where: { email: credentials.email} });

  res.status(200).send('success')
})

module.exports = router;
