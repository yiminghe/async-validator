const expect = require('expect.js');
const Schema = require('../index');

describe('pattern', () => {
  it('works for non-required empty string', (done) => {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
      },
    }).validate({
      // useful for web, input's value defaults to ''
      v: '',
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for non-required null', (done) => {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
      },
    }).validate({
      v: null,
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for non-required undefined', (done) => {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
      },
    }).validate({
      v: undefined,
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works', (done) => {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
      },
    }).validate({
      v: ' ',
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('haha');
      done();
    });
  });
});
