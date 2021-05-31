import rules from '../rule/index.js';

function required(rule, value, callback, source, options) {
  const errors = [];
  const type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

export default required;
