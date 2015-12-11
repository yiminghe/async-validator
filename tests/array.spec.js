const expect = require('expect.js');
const Schema = require('../index');

describe('array', () => {
  it('works for type', (done) => {
    new Schema({
      v: {
        type: 'array',
      },
    }).validate({
      v: '',
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is not an array');
      done();
    });
  });

  it('works for type and required', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'array',
      },
    }).validate({
      v: '',
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is not an array');
      done();
    });
  });

  it('works for none require', (done) => {
    new Schema({
      v: {
        type: 'array',
      },
    }).validate({
      v: [],
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for empty array', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'array',
      },
    }).validate({
      v: [],
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for undefined array', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'array',
      },
    }).validate({
      v: undefined,
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for null array', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'array',
      },
    }).validate({
      v: null,
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for none empty', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'array',
        message: 'haha',
      },
    }).validate({
      v: [1],
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });
});
