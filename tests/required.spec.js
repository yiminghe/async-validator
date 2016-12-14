const expect = require('expect.js');
const Schema = require('../index');
const required = true;

describe('required', () => {
  it('works for array required=true', (done) => {
    new Schema({
      v: [{
        required,
        message: 'no',
      }],
    }).validate({
      v: [],
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('no');
      done();
    });
  });

  it('works for array required=true & custom message', (done) => {
    // allow custom message
    new Schema({
      v: [{
        required,
        message: 'no',
      }],
    }).validate({
      v: [1],
    }, (errors) => {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for array required=false', (done) => {
    new Schema({
      v: {
        required: false,
      },
    }).validate({
      v: [],
    }, (errors) => {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for string required=true', (done) => {
    new Schema({
      v: {
        required,
      },
    }).validate({
      v: '',
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for string required=false', (done) => {
    new Schema({
      v: {
        required: false,
      },
    }).validate({
      v: '',
    }, (errors) => {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for number required=true', (done) => {
    new Schema({
      v: {
        required,
      },
    }).validate({
      v: 1,
    }, (errors) => {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for number required=false', (done) => {
    new Schema({
      v: {
        required: false,
      },
    }).validate({
      v: 1,
    }, (errors) => {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for null required=true', (done) => {
    new Schema({
      v: {
        required,
      },
    }).validate({
      v: null,
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for null required=false', (done) => {
    new Schema({
      v: {
        required: false,
      },
    }).validate({
      v: null,
    }, (errors) => {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for undefined required=true', (done) => {
    new Schema({
      v: {
        required,
      },
    }).validate({
      v: undefined,
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for undefined required=false', (done) => {
    new Schema({
      v: {
        required: false,
      },
    }).validate({
      v: undefined,
    }, (errors) => {
      expect(errors).not.to.be.ok();
      done();
    });
  });
});
