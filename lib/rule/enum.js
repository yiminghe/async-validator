var util = require('../util');
var error = require('./error');

/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
var enumerable = function (rule, value, source, errors, options) {
  rule['enum'] = Array.isArray(rule['enum']) ? rule['enum'] : [];
  if (rule['enum'].indexOf(value) === -1) {
    errors.push(error(rule,
      util.format(options.messages['enum'], rule.fullField, rule['enum'].join(', '))));
  }
};

module.exports = enumerable;
