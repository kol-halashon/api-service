let fs = require('fs');
let _ = require('lodash');
let path = require('path');
let Sequelize = require('sequelize');
let basename = path.basename(__filename);

let sequelizeConnection = require(path.join(__dirname, '../db', 'connect.js'));

let db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    let model = require('./' + file);
    if (_.upperFirst(_.camelCase(model.name)) !== '') {
      db[_.upperFirst(_.camelCase(model.name))] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (!_.isNil(db[modelName].associate)) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelizeConnection;
db.Sequelize = Sequelize;

module.exports = db;
