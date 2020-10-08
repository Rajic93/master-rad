const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.findAll();

    res.status(200).send(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id, { attributes: ['id', 'email', 'username', 'first_name', 'last_name', 'status', 'role', 'cluster_id'] });

    res.status(200).send(user);
});

router.delete('/:id', async (req,res) => {
    await User.destroy({ where: { id } });

    res.status(200).send('User successfully deleted');
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const dataToUpdate = req.body;

    await User.update(dataToUpdate, { where: { id } });

    const updatedUser = await User.findByPk(id, { attributes: ['id', 'email', 'username', 'first_name', 'last_name', 'status', 'role'] });

    res.status(200).send(updatedUser);
});

router.get('/cluster', (req,res) => {
    res.status(200).send('success');
});

router.get('/similar', (req,res) => {
    res.status(200).send('success')
});

module.exports = router;
