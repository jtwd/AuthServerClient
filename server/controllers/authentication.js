const jwt = require('jwt-simple');
const User = require('../models/user');

const config = require('../config');

function _tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    config.secret
  );
}

exports.login = function (req, res, next) {
  res.send({ token: _tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Email and Password must be provided'});
  }

  // Does user exist? (email)
  User.findOne({ email: email }, function(err, existingUser) {
    // Error with db search
    if (err) {
      return next(err);
    }

    // If yes, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email already exists'});
    }

    // If not, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err) }

      // Respond to request
      res.json({ token: _tokenForUser(user) });
    });

  });

};