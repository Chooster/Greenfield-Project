const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;
const BCRYPT_COST = 11;

const checkUserError = (err, res) => {
  if (typeof err === 'string') {
    res.status(STATUS_USER_ERROR);
    res.json({ error: err });
    return;
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: err.message });
};

const createUser = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, BCRYPT_COST, (err, passwordHash) => {
    if (err) checkUserError({ error: err.message, 'ERROR STACK': err.stack }, res);
    new User({ name: username, password: passwordHash })
      .save((error, user) => {
        if (error) checkUserError({ [`The name '${username}' is already taken.`]: error.message, 'ERROR STACK': error.stack }, res);
        res.json(user);
      });
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ name: username }, (err, user) => {
    if (err) checkUserError(err, res);
    if (!user) checkUserError('User not found!', res);
    if (!password) checkUserError('Must provide password!', res);
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err) {
        checkUserError(err, res);
        return;
      }
      if (!isValid) {
        checkUserError('Incorrect Username and Password combination', res);
        return;
      }
      // req.session.user = user;
      res.json({ success: true });
    });
  });
};

module.exports = {
  createUser,
  loginUser,
};
