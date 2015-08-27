'use strict';

var util = require('../util');
var required = require('./required');
var pattern = {
  email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};

var types = {
  integer(value) {
    return types.number(value) && parseInt(value) === value;
  },
  float(value) {
    return types.number(value) && !types.integer(value);
  },
  array(value) {
    return Array.isArray(value);
  },
  regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
  },
  number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof (value) === 'number';
  },
  object(value) {
    return typeof (value) === 'object' && !types.array(value);
  },
  method(value) {
    return typeof (value) === 'function';
  },
  email(value) {
    return typeof (value) === 'string' && !!value.match(pattern.email);
  },
  url(value) {
    return typeof (value) === 'string' && !!value.match(pattern.url);
  },
  hex(value) {
    return typeof (value) === 'string' && !!value.match(pattern.hex);
  }
};

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
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }
  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number'];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(util.format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
    // straight typeof check
  } else if (ruleType && typeof (value) !== rule.type) {
    //console.log("checking type %s", type);
    //console.log("checking value %s", value);
    errors.push(util.format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};

module.exports = type;
