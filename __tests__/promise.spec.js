import Schema from '../src/';

describe('validator', () => {
  it('works', (done) => {
    new Schema({
      v: [{
        validator(rule, value) {
          return Promise.reject(new Error('e1'));
        },
      }, {
        validator(rule, value) {
          return Promise.reject(new Error('e2'));
        },
      }],
      v2: [{
        validator(rule, value) {
          return Promise.reject(new Error('e3'));
        },
      }],
    }).validate({
      v: 2,
    }, (errors) => {
      expect(errors.length).toBe(3);
      expect(errors[0].message).toBe('e1');
      expect(errors[1].message).toBe('e2');
      expect(errors[2].message).toBe('e3');
      done();
    });
  });

  it('first works', (done) => {
    new Schema({
      v: [{
        validator(rule, value) {
          return Promise.reject(new Error('e1'));
        },
      }, {
        validator(rule, value) {
          return Promise.reject(new Error('e2'));
        },
      }],
      v2: [{
        validator(rule, value) {
          return Promise.reject(new Error('e3'));
        },
      }],
    }).validate({
      v: 2,
      v2: 1,
    }, {
      first: true,
    }, (errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('e1');
      done();
    });
  });

  describe('firstFields', () => {
    it('works for true', (done) => {
      new Schema({
        v: [{
          validator(rule, value) {
            return Promise.reject(new Error('e1'));
          },
        }, {
          validator(rule, value) {
            return Promise.reject(new Error('e2'));
          },
        }],

        v2: [{
          validator(rule, value) {
            return Promise.reject(new Error('e3'));
          },
        }],
        v3: [{
          validator(rule, value) {
            return Promise.reject(new Error('e4'));
          },
        }, {
          validator(rule, value) {
            return Promise.reject(new Error('e5'));
          },
        }],
      }).validate({
        v: 1,
        v2: 1,
        v3: 1,
      }, {
        firstFields: true,
      }, (errors) => {
        expect(errors.length).toBe(3);
        expect(errors[0].message).toBe('e1');
        expect(errors[1].message).toBe('e3');
        expect(errors[2].message).toBe('e4');
        done();
      });
    });

    it('works for array', (done) => {
      new Schema({
        v: [{
          validator(rule, value) {
            return Promise.reject(new Error('e1'));
          },
        }, {
          validator(rule, value) {
            return Promise.reject(new Error('e2'));
          },
        }],

        v2: [{
          validator(rule, value) {
            return Promise.reject(new Error('e3'));
          },
        }],
        v3: [{
          validator(rule, value) {
            return Promise.reject(new Error('e4'));
          },
        }, {
          validator(rule, value) {
            return Promise.reject(new Error('e5'));
          },
        }],
      }).validate({
        v: 1,
        v2: 1,
        v3: 1,
      }, {
        firstFields: ['v'],
      }, (errors) => {
        expect(errors.length).toBe(4);
        expect(errors[0].message).toBe('e1');
        expect(errors[1].message).toBe('e3');
        expect(errors[2].message).toBe('e4');
        expect(errors[3].message).toBe('e5');
        done();
      });
    });
  });
});
