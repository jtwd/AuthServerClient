const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const config = require('../config');

const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(
  localOptions, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if(!isMatch) { return done(null, false); }

        return done(null, user);
      })
    });
  }
);


// Jtw Strategy options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // get ID from payload, check for it in the Users table of db
  // If its there, call 'done' with that ID
  // Otherwise, call done without user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    (user) ? done(null, user) : done(null, false);
  })
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
