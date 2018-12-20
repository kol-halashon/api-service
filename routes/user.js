const express = require('express');

const UserCtrl = require('../controllers/user');

const router = express.Router();

/* rest api */

router.get('/:id', (req, res) => {
  let userId = req.params.id;

  return UserCtrl.findById(userId)
    .then((user) => res.jsonSuccess(user))
    .catch((error) => res.jsonError(error));
});

router.post('/change-password', (req, res) => {
  let userId = req.user.id;
  let password = req.body.password;

  return UserCtrl.changePassword(password, userId)
    .then((user) => res.jsonSuccess(user))
    .catch((error) => res.jsonError(error));
});

// router.get('/', (req, res) => {
//   return UserCtrl.list()
//     .then((users) => res.jsonSuccess(users))
//     .catch((error) => res.jsonError(error));
// });

// router.post('/', (req, res) => {
//   let user = req.body.user;

//   return UserCtrl.create(user)
//     .then((user) => res.jsonSuccess(user))
//     .catch((error) => res.jsonError(error));
// });

// router.put('/:id', (req, res) => {
//   let userId = req.params.id;
//   let user = req.body.user;

//   return UserCtrl.update(userId, user)
//     .then((user) => res.jsonSuccess(user))
//     .catch((error) => res.jsonError(error));
// });

// router.delete('/:id', (req, res) => {
//   let userId = req.params.id;

//   UserCtrl.delete(userId)
//     .then((user) => res.jsonSuccess(user))
//     .catch((error) => res.jsonError(error));
// });

module.exports = router;
