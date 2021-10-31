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
    const { id } = req.params;
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

router.get('/cluster/:id', async (req, res) => {
    const { params: { id } } = req;
    const neighbours = await User.findAll({ where: { cluster_label: id }, attributes: ['id'] });
    const ids = neighbours.map(neighbour => neighbour.id);

    res.status(200).send(ids);
});

router.get('/:id/similar', async (req,res) => {
    const { params: { id } } = req;
    
    const user = await User.findByPk(id);
    const users = await User.findAll({ where: { cluster_id: user.cluster_id } });
                                      
    const filtered = user.filter((u) => u.id !== id);

    res.status(200).send(filtered);
});

router.get('/similar', async (req,res) => {
    const cluster_label = req.user.cluster;

    const similarUser = await User.findAll({
        cluster_label
    });

    // get all books from similar users
    const books = [];

    res.status(200).send(books)
});

module.exports = router;
