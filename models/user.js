const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelizeConnect = require('../db/connect');

const User = sequelizeConnect.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  number: {
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: 'Invalid email.' }
    },
    unique: {
      name: 'email',
      msg: 'Email is already registered.'
    }
  },
  permission: {
    type: Sequelize.ENUM('admin', 'manager', 'user'),
    allowNull: false,
    defaultValue: 'user'
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  note: {
    type: Sequelize.STRING
  },
  passwordHash: Sequelize.STRING,
  password: {
    type: Sequelize.VIRTUAL,
    set: function (val) {
      // Remember to set the data value, otherwise it won't be validated
      this.setDataValue('password', val);
      this.setDataValue('passwordHash', this.generateHash(val));
    },
    validate: {
      notEmpty: true,
      len: {
        args: [4, 50],
        msg: 'Please choose a longer password'
      }
    }
  },
  settings: {
    type: Sequelize.JSONB
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  deletedAt: Sequelize.DATE
}, {
  freezeTableName: true,
  indexes: [{ unique: true, fields: ['email'] }],
  paranoid: true
});

User.associate = function (models) {

};

User.prototype.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = User;
