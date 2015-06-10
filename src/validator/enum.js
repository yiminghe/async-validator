'use strict';

var rules = require('../rule/');
var ENUM = 'enum';

/**
 *  Validates an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
var enumerable = function (rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field));
  if (validate) {
    if (value === undefined && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    rules[ENUM](rule, value, source, errors, options);
  }
  callback(errors);
};

module.exports = enumerable;
