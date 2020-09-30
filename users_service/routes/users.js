const express = require('express');
const { User, BookRating, Book } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.findAll();

    res.status(200).send(users);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id, { attributes: ['id', 'email', 'username', 'first_name', 'last_name', 'status', 'role', 'cluster_id'] });

    res.status(200).send(user);
})

router.delete('/:id', async (req,res) => {
    await User.destroy({ where: { id } });

    res.status(200).send('User successfully deleted');
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const dataToUpdate = req.body;

    await User.update(dataToUpdate, { where: { id } });

    const updatedUser = await User.findByPk(id, { attributes: ['id', 'email', 'username', 'first_name', 'last_name', 'status', 'role'] });

    res.status(200).send(updatedUser);
})

router.get('/cluster', (req,res) => {
    res.status(200).send('success');
})

router.get('/similar', (req,res) => {
    res.status(200).send('success')
})

router.put('/rate', async (req,res) => {
    const {
        type,
        entityId,
        rating,
    } = req.query;

    const userId = req.user.id;

    if (type === 'book') {
        // create rating
        await BookRating.create({
            id: entityId,
            userId,
            rating,
        })

        //update Book rating
        const book = await Book.findByPk(entityId, { attributes: ['average_rating', 'ratings_count'] });
        const avg = Number.parseFloat(book.get('average_rating') || 0);
        const count = Number.parseFloat(book.get('ratings_count') || 0);
        const averageRating = (avg * count + rating)/ (count + 1);
        await Book.update(
          {
              average_rating: averageRating,
              ratings_count: count + 1,
          },
          { where: { id: entityId } },
        )

        return req.status(200).send('Success');
    }

    res.status(404).send('not found')
})

module.exports = router;
