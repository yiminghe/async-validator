var rules = require('../rule/');

/**
 *  Validates a regular expression pattern.
 *
 *  Performs validation when a rule only contains
 *  a pattern property but is not declared as a string type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
var pattern = function (rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field));
  if (validate) {
    if (value === undefined && !rule.required) {
      return callback();
    }
    rules.pattern(rule, value, source, errors, options);
  }
  callback(errors);
};

module.exports = pattern;
