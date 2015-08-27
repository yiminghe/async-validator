import rules from '../rule/';

function type(rule, value, callback, source, options) {
  const errors = [];
  rules.type(rule, value, source, errors, options);
  callback(errors);
}

export default type;
