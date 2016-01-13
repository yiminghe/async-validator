const expect = require('expect.js');
const Schema = require('../index');

describe('validator', () => {
  it('works', (done) => {
    new Schema({
      v: [{
        validator(rule, value, callback) {
          callback(new Error('e1'));
        },
      }, {
        validator(rule, value, callback) {
          callback(new Error('e2'));
        },
      }],
      v2: [{
        validator(rule, value, callback) {
          callback(new Error('e3'));
        },
      }],
    }).validate({
      v: 2,
    }, (errors) => {
      expect(errors.length).to.be(3);
      expect(errors[0].message).to.be('e1');
      expect(errors[1].message).to.be('e2');
      expect(errors[2].message).to.be('e3');
      done();
    });
  });

  it('first works', (done) => {
    new Schema({
      v: [{
        validator(rule, value, callback) {
          callback(new Error('e1'));
        },
      }, {
        validator(rule, value, callback) {
          callback(new Error('e2'));
        },
      }],
      v2: [{
        validator(rule, value, callback) {
          callback(new Error('e3'));
        },
      }],
    }).validate({
      v: 2,
      v2: 1,
    }, {
      first: true,
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('e1');
      done();
    });
  });

  describe('firstFields', () => {
    it('works for true', (done) => {
      new Schema({
        v: [{
          validator(rule, value, callback) {
            callback(new Error('e1'));
          },
        }, {
          validator(rule, value, callback) {
            callback(new Error('e2'));
          },
        }],

        v2: [{
          validator(rule, value, callback) {
            callback(new Error('e3'));
          },
        }],
        v3: [{
          validator(rule, value, callback) {
            callback(new Error('e4'));
          },
        }, {
          validator(rule, value, callback) {
            callback(new Error('e5'));
          },
        }],
      }).validate({
        v: 1,
        v2: 1,
        v3: 1,
      }, {
        firstFields: true,
      }, (errors) => {
        expect(errors.length).to.be(3);
        expect(errors[0].message).to.be('e1');
        expect(errors[1].message).to.be('e3');
        expect(errors[2].message).to.be('e4');
        done();
      });
    });

    it('works for array', (done) => {
      new Schema({
        v: [{
          validator(rule, value, callback) {
            callback(new Error('e1'));
          },
        }, {
          validator(rule, value, callback) {
            callback(new Error('e2'));
          },
        }],

        v2: [{
          validator(rule, value, callback) {
            callback(new Error('e3'));
          },
        }],
        v3: [{
          validator(rule, value, callback) {
            callback(new Error('e4'));
          },
        }, {
          validator(rule, value, callback) {
            callback(new Error('e5'));
          },
        }],
      }).validate({
        v: 1,
        v2: 1,
        v3: 1,
      }, {
        firstFields: ['v'],
      }, (errors) => {
        expect(errors.length).to.be(4);
        expect(errors[0].message).to.be('e1');
        expect(errors[1].message).to.be('e3');
        expect(errors[2].message).to.be('e4');
        expect(errors[3].message).to.be('e5');
        done();
      });
    });
  });
});
