'use strict';

var util = require('../util');

/**
 *  Rule for validating required fields.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
var required = function (rule, value, source, errors, options) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || value === undefined || value === null)) {
    errors.push(util.format(options.messages.required, rule.fullField));
  }
};

module.exports = required;
