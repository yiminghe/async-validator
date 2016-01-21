const expect = require('expect.js');
const Schema = require('../index');

describe('number', () => {
  it('works', (done) => {
    new Schema({
      v: {
        type: 'number',
      },
    }).validate({
      v: '1',
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is not a number');
      done();
    });
  });

  it('works for no-required', (done) => {
    new Schema({
      v: {
        type: 'number',
      },
    }).validate({
      v: undefined,
    }, (errors) => {
      expect(errors).not.to.ok();
      done();
    });
  });

  it('works for no-required', (done) => {
    new Schema({
      v: {
        type: 'number',
        required: true,
      },
    }).validate({
      v: undefined,
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('transform does not change value', (done) => {
    const value = {
      v: '1',
    };
    new Schema({
      v: {
        type: 'number',
        transform: Number,
      },
    }).validate(value, (errors) => {
      expect(value.v).to.be('1');
      expect(errors).not.to.ok();
      done();
    });
  });
});
