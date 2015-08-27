'use strict';

var rules = require('../rule/');

var date = function (rule, value, callback, source, options) {
  //console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field));
  //console.log('validate on %s value', value);
  if (validate) {
    if (value === undefined && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    rules.type(rule, value, source, errors, options);
    if (value) {
      rules.range(rule, value.getTime(), source, errors, options);
    }
  }
  callback(errors);
};

module.exports = date;
