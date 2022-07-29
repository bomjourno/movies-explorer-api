const movies = require('./movies');
const users = require('./users');
const auth = require('./auth');
const authProtect = require('../middlewares/authHandler');

const NotFound = require('../errors/NotFound');

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use('/', auth);
  app.use(authProtect);
  app.use('/users', users);
  app.use('/movies', movies);
  app.all('*', (req, res, next) => {
    next(new NotFound('Страница не существует'));
  });
};
