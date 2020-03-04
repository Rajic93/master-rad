
const express = require('express');
const router = express.Router();
const { Books } = require('../services'); 

router.get('/', async (
    {
        query: {
            page,
            limit,
            search,
            order = [],
            genres = [],
        },
    },
    res,
) => {
    try {
        const books = await Books.findAll({
            page,
            limit,
            search,
            order,
            genres
        });
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.get('/author/:id', async (
    { params: { id } },
    res,
) => {
    try {
        const books = await Books.findByAuthor(id);
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.get('/genres', async (
    { query: { genres } },
    res,
) => {
    try {
        const books = await Books.findByGenres(genres);
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.get('/recommend', async ({ user: { id } }, res) => {
    try {
        
    } catch (error) {    
        res.status(500).send(error.toString());
    }
});

router.post('/rate', async (
    {
        user: { id },
        query: {
            book_id,
            rating
        },
    },
    res,
) => {
    try {
        const book = await Books.findById();
        if (!book) {
            return res.status(404).send('Book not found');
        }
        
        await book.addBooksRatings(
            Books.booksRatings,
            {
                through: {
                    user_id: id,
                    book_id,
                    rating,
                },
            },
        );
        
        let avgRating = book.get('average_rating') || 0;
        const numOfRatings = book.get('no_of_ratings') || 0;
        avgRating = (avgRating * numOfRatings + rating) / (numOfRatings + 1);
        await book.update(
            {
                average_rating: avgRating,
                no_of_ratings: numOfRatings + 1,
            },
            { where: { id: books.get('id') } },
        );

        res.status(200).send({
            book_id,
            rating
        });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
