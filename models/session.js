const Sequelize = require('sequelize');

const sequelizeConnect = require('../db/connect');

const Session = sequelizeConnect.define('Session', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: Sequelize.STRING
  },
  sid: {
    type: Sequelize.STRING
  },
  expires: {
    type: Sequelize.STRING
  },
  session_id: {
    type: Sequelize.STRING
  }
});

module.exports = Session;
