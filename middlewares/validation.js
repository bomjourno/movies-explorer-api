const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');

const validationURL = (message) => (value, helpers) => {
  if (isURL(value)) return value;
  return helpers.message(message);
};

module.exports.registrationValidationCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.loginValidationCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.patchUserValidationCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

module.exports.createMovieValidationCheck = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationURL('Некорректная ссылка на постер')),
    trailerLink: Joi.string().required().custom(validationURL('Некорректная ссылка на на трейлер')),
    thumbnail: Joi.string().required().custom(validationURL('Некорректная ссылка на превью постера')),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidationCheck = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
