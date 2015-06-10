'use strict';

var rules = require('../rule/');

var type = function (rule, value, callback, source, options) {
  var errors = [];
  rules.type(rule, value, source, errors, options);
  callback(errors);
};

module.exports = type;
