const expect = require('expect.js');
const Schema = require('../index');

describe('date', () => {
  it('required works for undefined', (done) => {
    new Schema({
      v: {
        type: 'date',
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

  it('required works for ""', (done) => {
    new Schema({
      v: {
        type: 'date',
        required: true,
      },
    }).validate({
      v: '',
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is not a date');
      done();
    });
  });
});
