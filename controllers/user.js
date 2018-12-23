const bcrypt = require('bcryptjs');

const utils = require('../utils');
const models = require('../models');
const User = models.User;

let userFields = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'permission',
  'password'
];

class UserCtrl {
  static create (user) {
    if (!user.email) {
      let error = new Error('User email is required.');
      throw error;
    }

    let newUserObject = {};
    userFields.forEach((field) => {
      if (user[field]) {
        newUserObject[field] = utils.trim(user[field]);
        if (field === 'email') {
          newUserObject[field] = newUserObject[field].toLowerCase();
        }
      }
    });
    return User.create(newUserObject)
      .then((user) => removeUserPassword(user));
  }

  static update (id, user) {
    if (!user.email && !user.password) {
      let error = new Error('User details cannot be empty.');
      throw error;
    }

    return User.findById(id)
      .then((resUser) => {
        let changesObject = {};

        userFields.forEach((field) => {
          if (user[field]) {
            changesObject[field] = utils.trim(user[field]);
            if (field === 'email') {
              changesObject[field] = changesObject[field].toLowerCase();
            }
          }
        });

        return resUser.update(changesObject);
      })
      .then((user) => removeUserPassword(user));
  }

  static delete (id) {
    return User.destroy({ where: { id } });
  }

  static list () {
    return User.findAll();
  }

  static findById (id) {
    return User.findById(id);
  }

  static changePassword (password, userId) {
    return User.findById(userId)
      .then((userResult) => {
        return userResult.update({ password: password });
      })
      .then((user) => removeUserPassword(user));
  }

  static comparePassword (password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = UserCtrl;

function removeUserPassword (user) {
  user = user.get({
    plain: true
  });
  user.password = '****';
  delete user.passwordHash;
  return user;
}
