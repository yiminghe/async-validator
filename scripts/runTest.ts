import Schema, {
  ValidateCallback,
  ValidateFieldsError,
  Values,
} from '../src/index';

const callback: ValidateCallback = (errors, fields) => {
  if (errors === null) {
    const f: Values = fields;
    console.log('transformed values:', JSON.stringify(f));
  } else {
    const f: ValidateFieldsError = fields;
    console.log('validate error:', JSON.stringify(f));
  }
};

new Schema({
  v: {
    required: true,
    type: 'array',
    defaultField: [{ type: 'number', max: 0, transform: i => Number(i) }],
  },
}).validate(
  {
    v: ['1', '2'],
  },
  callback,
);
