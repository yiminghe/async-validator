const expect = require('expect.js');
const Schema = require('../index');

describe('deep', () => {
  it('deep array specific validation', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'array',
        fields: {
          0: [{type: 'string'}],
          1: [{type: 'string'}],
        },
      },
    }).validate({
      v: [1, 'b'],
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v.0 is not a string');
      done();
    });
  });

  it('deep array all values validation', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'array',
        values: [{type: 'string'}],
      },
    }).validate({
      v: [1, 2, 'c'],
    }, (errors) => {
      expect(errors.length).to.be(2);
      expect(errors[0].message).to.be('v.0 is not a string');
      expect(errors[1].message).to.be('v.1 is not a string');
      done();
    });
  });

  it('deep object specific validation', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'object',
        fields: {
          a: [{type: 'string'}],
          b: [{type: 'string'}],
        },
      },
    }).validate({
      v: {
        'a': 1,
        'b': 'c',
      },
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v.a is not a string');
      done();
    });
  });

  it('deep object all values validation', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'object',
        values: [{type: 'string'}],
      },
    }).validate({
      v: {
        'a': 1,
        'b': 'c',
      },
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v.a is not a string');
      done();
    });
  });
});
