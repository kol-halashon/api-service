const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let utils = {
  trim: function (value) {
    if (!_.isString(value)) {
      return value;
    }
    return _.trim(value) || null;
  }
};

module.exports = utils;
