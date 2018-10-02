/* eslint no-console:0 */

import Schema from 'async-validator';

const schema = new Schema({
  name: {
    type: 'string',
    required: true,
    min: 5,
    max: 10,
  },
  address: {
    type: 'object',
    required: true,
    fields: {
      province: {
        type: 'string',
        required: true,
        min: 4,
      },
      city: {
        type: 'string',
        message: 'custom message',
        min: 5,
      },
      async: {
        validator(rule, value, callback) {
          setTimeout(() => {
            callback(rule.message);
          }, 100);
        },
        message: 'address async fails',
      },
    },
  },
  async: {
    validator(rule, value, callback) {
      setTimeout(() => {
        callback([new Error(rule.message)]);
      }, 100);
    },
    message: 'async fails',
  },
});

schema.validate({
  name: 2,
  address: {
    city: 2,
  },
  async: '2',
}, (errors, fields) => {
  console.log('errors');
  console.log(errors);
  console.log('fields');
  console.log(fields);
})
  .catch(({ errors, fields }) => {
    console.log(errors, fields);
  });

console.log('end');
