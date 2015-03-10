var util = require('../util');
var types = {};

types.integer = function (value) {
  return typeof(value) === 'number' && parseInt(value) === value;
};

types.float = function (value) {
  return typeof(value) === 'number' && !types.integer(value);
};

types.array = function (value) {
  return Array.isArray(value);
};

types.regexp = function (value) {
  if (value instanceof RegExp) {
    return true;
  }
  try {
    return !!new RegExp(value);
  } catch (e) {
    return false;
  }
};

types.object = function (value) {
  return typeof(value) === 'object' && !types.array(value);
};

types.method = function (value) {
  return typeof(value) === 'function';
};

var pattern = {
  email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};

types.email = function (value) {
  return typeof(value) === 'string' && !!value.match(pattern.email);
};

types.url = function (value) {
  return typeof(value) === 'string' && !!value.match(pattern.url);
};

types.hex = function (value) {
  return typeof(value) === 'string' && !!value.match(pattern.hex);
};
//types.string = function(value) {
//return typeof(value) === 'string' || (value instanceof String);
//}

/**
 *  Rule for validating the type of a value.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
var type = function (rule, value, source, errors, options) {
  // if value is required and value is undefined
  // no need  to add this error message
  if (rule.required && value === undefined) {
    return;
  }
  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email'];
  var type = rule.type;
  if (custom.indexOf(type) > -1) {
    if (!types[type](value)) {
      errors.push(util.format(options.messages.types[type], rule.fullField, rule.type));
    }
    // straight typeof check
  } else if (type && typeof(value) !== rule.type) {
    //console.log("checking type %s", type);
    //console.log("checking value %s", value);
    errors.push(util.format(options.messages.types[type], rule.fullField, rule.type));
  }
};

module.exports = type;
