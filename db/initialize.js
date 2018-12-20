const sequelizeConnect = require('./connect');

let sync = {
  initAll: () => {
    return sequelizeConnect.sync({ force: true });
  }
};

module.exports = sync;
