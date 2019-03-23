/* eslint no-console:0 no-unused-vars:0 */

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
        asyncValidator(rule, value, callback) {
          setTimeout(() => {
            callback(rule.message);
          }, 100);
        },
        message: 'address async fails',
      },
    },
  },
  async: {
    asyncValidator(rule, value) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject([new Error(rule.message)]);
        }, 100);
      });
    },
    message: 'async fails',
  },
});

(async () => {
  const { errors, fields } = await schema.validate({
    name: 2,
    address: {
      city: 2,
    },
    async: '2',
  });

  if (errors) {
    console.log('errors', errors, fields);
    console.log('end with errors');
  } else {
    console.log('end without errors');
  }
})();
