import rules from '../rule/';

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
function pattern(rule, value, callback, source, options) {
  const errors = [];
  const validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field));
  if (validate) {
    if (value === undefined && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

export default pattern;
