/* eslint no-console:0 */

import Schema from 'async-validator';

const schema = new Schema({
  validator0: {
    asyncValidator(rule, value, callback) {
      setTimeout(() => callback('Validator0 message'), 100);
    },
  },
  validator1: {
    asyncValidator() {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject('Validator1 message'), 100);
      });
    },
  },
});

schema.validate({
  validator0: '0',
  validator1: '1',
}, {
  suppressWarning: true,
}, (errors, fields) => {
  console.log('errors');
  console.log(errors);
  console.log('fields');
  console.log(fields);
});

console.log('end');
