const express = require('express');

const SignUpCtrl = require('../controllers/sign-up');

const router = express.Router();

router.post('/', (req, res) => {
  let userDetails = req.body.userDetails;

  return SignUpCtrl.signUp(userDetails)
    .then((result) => res.jsonSuccess(result))
    .catch((error) => res.jsonError(error));
});

router.post('/check-registered', (req, res) => {
  let email = req.body.email;
  let user = req.user;

  return SignUpCtrl.checkRegisteredEmail(email, user)
    .then((result) => res.jsonSuccess(result))
    .catch((error) => res.jsonError(error));
});

module.exports = router;
