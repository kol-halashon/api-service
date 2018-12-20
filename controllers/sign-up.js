const _ = require('lodash');

const Models = require('../models');
const User = Models.User;
const UserCtrl = require('./user');

class SignUpCtrl {
  static signUp (userDetails) {
    userDetails.permission = 'manager';
    return UserCtrl.create(userDetails)
      .then((user) => {
        console.log('New user: ', user);
        return user;
      });
  }

  static checkRegisteredEmail (email) {
    return User.findOne({
      where: { email }
    })
      .then((user) => {
        return Promise.resolve(!_.isNil(user));
      });
  }
}

module.exports = SignUpCtrl;
