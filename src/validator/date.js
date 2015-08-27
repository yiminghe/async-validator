import rules from '../rule/';

function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  const errors = [];
  const validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field));
  // console.log('validate on %s value', value);
  if (validate) {
    if (value === undefined && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value.getTime(), source, errors, options);
    }
  }
  callback(errors);
}

export default date;
