const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');

require('dotenv').config();

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const createUser = (hash) => User.create({ name, email, password: hash });
  bcrypt
    .hash(password, 10)
    .then((hash) => createUser(hash))
    .then((user) => {
      const { _id } = user;
      res.send({
        _id,
        name,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже зарегестрирован'));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.clearCookie('jwt');
  res.send({ message: 'Выполнен выход из аккаунта' });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFound('Такого пользователя не существует'));
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не существует');
      } else {
        res.status(200).send({ email: user.email, name: user.name });
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже зарегестрирован'));
      } else {
        next(err);
      }
    });
};
