var util = require('./util');
var validators = require('./validator/');
var messages = require('./messages');
var error = require('./rule/').error;

function asyncMap(arr, func, callback) {
  var results = [];

  function count(_, result) {
    results.push(result);
    if (results.length === arr.length) {
      callback(null, results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */
var Schema = module.exports = function (descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
};

/**
 *  Get or set the messages used for this schema.
 *
 *  @param messages The validation messages.
 *
 *  @return The validation messages.
 */
Schema.prototype.messages = function (messages) {
  if (messages) {
    this._messages = messages;
  }
  return this._messages;
};

/**
 *  Define rules on this schema.
 *
 *  @param rules The schema rules.
 *
 *  @api public
 */
Schema.prototype.define = function (rules) {
  if (!rules) {
    throw new Error(
      "Cannot configure a schema with no rules");
  }
  if (typeof rules !== 'object' || Array.isArray(rules)) {
    throw new Error("Rules must be an object");
  }
  this.rules = {};
  var z, item;
  for (z in rules) {
    item = rules[z];
    this.rules[z] = Array.isArray(item) ? item : [item];
  }
};

/**
 *  Validate an object against this schema.
 *
 *  @param source The object to validate.
 *  @param options Validation options.
 *  @param callback A callback  to invoke when validation is complete.
 *
 *  @api public
 */
Schema.prototype.validate = function (source, options, callback) {
  if (!this.rules) {
    throw new Error("Cannot validate with no rules.");
  }
  options = options || {};
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  var complete = function (results) {
    //console.log("got validation results %j", results);
    var i, field, errors = [], fields = {};
    var add = function (e) {
      if ((e instanceof Error)) {
        errors.push(e);
      } else if (Array.isArray(e)) {
        errors = errors.concat.apply(errors, e);
      }
    };
    for (i = 0; i < results.length; i++) {
      add(results[i]);
    }
    if (!errors.length) {
      errors = null;
      fields = null;
    } else {
      if (options.single) {
        errors = errors.slice(0, 1);
      }
      for (i = 0; i < errors.length; i++) {
        field = errors[i].field;
        fields[field] = fields[field] || [];
        fields[field].push(errors[i]);
      }
    }
    callback(errors, fields);
  };
  var messages = options.messages || this.messages();
  options.messages = messages;
  options.error = error;
  var j, z, arr, value, i, rule, series = [];
  var keys = options.keys || Object.keys(this.rules);
  for (j = 0; j < keys.length; j++) {
    z = keys[j];
    arr = this.rules[z];
    value = source[z];
    //console.log('validate on key %s', z);
    for (i = 0; i < arr.length; i++) {
      rule = arr[i];

      //console.log('validate on rule %j', rule);
      if (typeof(rule.transform) === 'function') {
        value = source[z] = rule.transform(value);
      }
      if (typeof(rule) === 'function') {
        rule = {
          validator: rule
        };
      }
      rule.field = z;
      rule.fullField = rule.fullField || z;
      rule.type = this.getType(rule);
      rule.validator = this.getValidationMethod(rule);
      if (!rule.validator) {
        //console.log('no validator found for %s', z);
        continue;
      }
      series.push({rule: rule, value: value, source: source, field: z});
    }
  }
  asyncMap(series, function (data, callback) {
    var rule = data.rule;
    var deep = (rule.type === 'object' || rule.type === 'array') && typeof(rule.fields) === 'object';
    deep = deep && (rule.required || (!rule.required && data.value));
    //console.log("Validating field %s", rule.field);
    rule.field = data.field;
    var cb = function (errors) {
      //delete rule.validator;
      //delete rule.field;
      //console.log("Completed rule validation...");
      if (errors && !Array.isArray(errors)) {
        errors = [errors];
      }
      if (errors) {
        errors.forEach(function (e, i) {
          if (!e.message) {
            e = new Error(e);
          }
          e.field = e.field || rule.fullField;
          errors[i] = e;
        });
      }
      if (options.first && errors && errors.length) {
        return complete(errors);
      }
      if (!deep) {
        callback(null, errors);
      } else {
        errors = errors || [];
        // if rule is required but the target object
        // does not exist fail at the rule level and don't
        // go deeper
        if (rule.required && !data.value) {
          return callback(null, [
            options.error(
              rule, util.format(options.messages.required, rule.field))
          ]);
        }
        var fieldsSchema = data.rule.fields;
        for (var f in fieldsSchema) {
          var fieldSchema = fieldsSchema[f];
          fieldSchema.fullField = rule.fullField + '.' + f;
        }
        var schema = new Schema(fieldsSchema);
        schema.messages(options.messages);
        if (data.rule.options) {
          data.rule.options.messages = options.messages;
          data.rule.options.error = options.error;
        }
        schema.validate(
          data.value, data.rule.options || options, function (errs) {
            callback(null, errs && errs.length ? errors.concat(errs) : errs);
          });
      }
    };
    rule.validator(
      rule, data.value, cb, data.source, options);
  }, function (err, results) {
    complete(results);
  });
};

/**
 *  Infer the type of a rule when necessary.
 *
 *  @param rule The validation rule.
 *
 *  @api private
 */
Schema.prototype.getType = function (rule) {
  if (rule.type === undefined && (rule.pattern instanceof RegExp)) {
    rule.type = 'pattern';
  }
  //if(typeof rule.validator === 'function') {
  //return 'function';
  //}
  //console.dir(rule);
  if (typeof(rule.validator) !== 'function' && (!rule.type || !validators.hasOwnProperty(rule.type))) {
    throw new Error(util.format("Unknown rule type %s", rule.type));
  }
  return rule.type;
};

/**
 *  Retrieve a validation method from a rule.
 *
 *  @param rule The validation rule.
 *
 *  @api private
 */
Schema.prototype.getValidationMethod = function (rule) {
  if (typeof rule.validator === 'function') {
    return rule.validator;
  }
  return validators[rule.type] || false;
};

/**
 *  Register a validator function for a type.
 *
 *  @param type The type for the validation rule.
 *  @param validator The validation function for the rule.
 *
 *  @api public
 */
module.exports.register = function (type, validator) {
  if (typeof validator !== 'function') {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators[type] = validator;
};

module.exports.messages = messages;
