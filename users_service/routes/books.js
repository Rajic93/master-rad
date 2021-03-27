const express = require('express');
const { Book } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const { query: { limit = 10, offset = 0} = {} } = req;

    const books = await Book.findAndCountAll({
        limit,
        offset,
    });

    res.status(200).send(books);
});


module.exports = router;
