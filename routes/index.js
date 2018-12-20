const express = require('express');

const routerExtendRes = require('./router-extend-res');
const login = require('./login');
const projectRouter = require('./project');
const signUpRouter = require('./sign-up');
const userRouter = require('./user');

const router = express.Router();

router.use(routerExtendRes);

let checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.jsonError('Authentication failed', 403);
};

let isAuthenticated = (req, res, next) => {
  let userResult = req.user;
  if (req.isAuthenticated()) {
    return res.jsonSuccess(userResult);
  }
  return res.jsonError('Authentication failed', 403);
};

let logout = (req, res, next) => {
  req.logout();
  res.jsonSuccess('disconnected');
};

router.use('/is-authenticated', isAuthenticated);
router.use('/login', login);
router.use('/logout', logout);
router.use('/project', checkAuthentication, projectRouter);
router.use('/sign-up', signUpRouter);
router.use('/user', checkAuthentication, userRouter);

router.get('/', (req, res) => {
  res.send('<h1>API</h1><hr/>');
});

module.exports = router;
