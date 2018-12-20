const passport = require('passport');

const User = require('../models/user');
const UserCtrl = require('../controllers/user');
const LocalStrategy = require('passport-local').Strategy;

// Serialize sessions
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return User.findOne({
    where: { id, active: true }
  })
    .then((user) => {
      if (user) {
        if (user.dataValues.passwordHash) {
          delete user.dataValues.passwordHash;
        }
        if (user._previousDataValues.passwordHash) {
          delete user._previousDataValues.passwordHash;
        }
      }
      done(null, user);
      return null;
    })
    .error((err) => {
      done(err, null);
      return null;
    });
});

// Use local strategy to create user account
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    return User.findOne({ where: { email, active: true } })
      .then((user) => {
        if (!user) {
          done(null, false, { message: 'Unknown user' });
          return null;
        } else if (!UserCtrl.comparePassword(password, user.passwordHash)) {
          done(null, false, { message: 'Invalid password' });
          return null;
        } else {
          done(null, user);
          return null;
        }
      })
      .error((err) => {
        return done(err);
      });
  }
));

module.exports = passport;
