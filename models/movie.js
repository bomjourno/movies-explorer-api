const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (u) => isURL(u),
      message: 'Некорректная ссылка на постер',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (u) => isURL(u),
      message: 'Некорректная ссылка на трейлер к фильму',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (u) => isURL(u),
      message: 'Некорректная ссылка на превью постера',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);