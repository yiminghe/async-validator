/* eslint no-console:0 no-unused-vars:0 */

import Schema from 'async-validator';

const schema = new Schema({
  validator0: {
    validator(rule, value) {
      return true;
    },
  },
  validator1: {
    validator(rule, value) {
      return false;
    },
  },
  validator2: {
    validator(rule, value) {
      return false;
    },
    message: 'Customize error messages1',
  },
  validator3: {
    validator(rule, value) {
      return new Error('Customize error messages2');
    },
  },
  validator4: {
    validator(rule, value) {
      return [
        'Error message 1',
        'Error message 2',
        'Error message 3',
      ];
    },
  },
  validator5: {
    validator(rule, value, callback) {
      setTimeout(() => callback('Compatible with older USES'), 100);
    },
  },
});

schema.validate({
  validator0: '0',
  validator1: '1',
  validator2: '2',
  validator3: '3',
  validator4: '4',
}, (errors, fields) => {
  console.log('errors');
  console.log(errors);
  console.log('fields');
  console.log(fields);
});

console.log('end');
