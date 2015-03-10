var util = require('../util');
var error = require('./error');

/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
var whitespace = function (rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === "") {
    errors.push(error(rule,
      util.format(options.messages.whitespace, rule.fullField)));
  }
};

module.exports = whitespace;
