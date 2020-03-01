
const express = require('express');
const router = express.Router();
const { Movies } = require('../services'); 

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
        const movies = await Movies.findAll({
            page,
            limit,
            search,
            order,
            genres,
        });
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.get('/recommend', async () => {});

router.post('/rate', async (
    {
        user: { id },
        query: {
            movie_id,
            rating
        },
    },
    res,
) => {
    try {
        const movie = await Movies.findById(movie_id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        
        await movie.addMoviesRatings(
            Movies.moviesRatings,
            {
                through: {
                    user_id: id,
                    movie_id,
                    rating,
                },
            },
        );
        
        let avgRating = movie.get('average_rating');
        const numOfRatings = movie.get('no_of_ratings');
        avgRating = (avgRating * numOfRatings + rating) / (numOfRatings + 1);
        await movie.update(
            {
                average_rating: avgRating,
                no_of_ratings: numOfRatings + 1,
            },
            { where: { id: movies.get('id') } },
        );

        res.status(200).send({
            movie_id,
            rating
        });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
