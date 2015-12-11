const expect = require('expect.js');
const Schema = require('../index');

describe('string', () => {
  it('works for none require', (done) => {
    new Schema({
      v: {
        type: 'string',
      },
    }).validate({
      v: '',
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for empty string', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
      },
    }).validate({
      v: '',
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for undefined string', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
      },
    }).validate({
      v: undefined,
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for null string', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
      },
    }).validate({
      v: null,
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for message', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
        message: 'haha',
      },
    }).validate({
      v: null,
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('haha');
      done();
    });
  });

  it('works for none empty', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
        message: 'haha',
      },
    }).validate({
      v: ' ',
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for whitespace empty', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
        whitespace: true,
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
