var util = require('../util');

/**
 *  Rule for validating a regular expression pattern.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
var pattern = function (rule, value, source, errors, options) {
  //console.log('testing pattern %s', value);
  //console.log('testing with rule %s', rule.pattern);
  if (rule.pattern instanceof RegExp) {
    if (!rule.pattern.test(value)) {
      errors.push(util.format(options.messages.pattern.mismatch,
          rule.fullField, value, rule.pattern));
    }
  }
};

module.exports = pattern;
