const express = require('express');

const routerExtendRes = require('./router-extend-res');
const actionsRouter = require('./actions');
const appraisalRouter = require('./appraisal');
const customerRouter = require('./customer');
const fileRouter = require('./file');
const login = require('./login');
const projectRouter = require('./project');
const ownerRouter = require('./owner');
const realEstateInformation = require('./real-estate-information');
const searchRouter = require('./search');
const signUpRouter = require('./sign-up');
const taskRouter = require('./task');
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
router.use('/actions', checkAuthentication, actionsRouter);
router.use('/appraisal', checkAuthentication, appraisalRouter);
router.use('/customer', checkAuthentication, customerRouter);
router.use('/file', checkAuthentication, fileRouter);
router.use('/project', checkAuthentication, projectRouter);
router.use('/owner', checkAuthentication, ownerRouter);
router.use('/real-estate-information', checkAuthentication, realEstateInformation);
router.use('/search', checkAuthentication, searchRouter);
router.use('/sign-up', signUpRouter);
router.use('/task', checkAuthentication, taskRouter);
router.use('/user', checkAuthentication, userRouter);

router.get('/', (req, res) => {
  res.send('<h1>API</h1><hr/>');
});

module.exports = router;
