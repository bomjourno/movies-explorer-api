const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidationCheck, deleteMovieValidationCheck } = require('../middlewares/validation');

router.post('/', createMovieValidationCheck, createMovie);
router.get('/', getMovies);
router.delete('/:movieId', deleteMovieValidationCheck, deleteMovie);

module.exports = router;
