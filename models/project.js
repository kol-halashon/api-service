const Sequelize = require('sequelize');

const sequelizeConnect = require('../db/connect');

const Project = sequelizeConnect.define('project', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  number: {
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  note: {
    type: Sequelize.TEXT
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  deletedAt: Sequelize.DATE
}, {
  freezeTableName: true,
  paranoid: true
});

module.exports = Project;
