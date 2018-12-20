const express = require('express');

const passport = require('../passport');

const router = express.Router();

router.post('/', function handleLocalAuthentication (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res.jsonError(info);
    }
    // Manually establish the session...
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.jsonSuccess(user);
    });
  })(req, res, next);
});

module.exports = router;
