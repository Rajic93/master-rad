const express = require('express');
const { User } = require('../models');
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
    const credentials = req.body;

    const user = await User.findOne({ where: { email: credentials.email }});
    if (user) {
        return res.status(400).send('User already exists (Jok).');
    }

    const toBeCreated = {
        ...credentials,
        status: 0,
        role: 'regular',
    };

    const created = await User.create(toBeCreated);

    delete created.password;

    res.status(200).send(created)
})

router.get('/activate', async (req,res) => {
    const { email } = req.body;

    await User.update({ status: 1 }, { where: { email } });

    res.status(200).send('success')
})

router.get('/deactivate', async (req,res) => {
    const { email } = req.body;

    await User.update({ status: 0 }, { where: { email } });

    res.status(200).send('success')
})

router.post('/forgot-password', (req, res) => {
    // necemo za sad
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
