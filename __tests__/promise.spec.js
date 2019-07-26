import Schema from '../src/';

describe('asyncValidator', () => {
  it('works', done => {
    new Schema({
      v: [
        {
          asyncValidator(rule, value) {
            return Promise.reject(new Error('e1'));
          },
        },
        {
          asyncValidator(rule, value) {
            return Promise.reject(new Error('e2'));
          },
        },
      ],
      v2: [
        {
          asyncValidator(rule, value) {
            return Promise.reject(new Error('e3'));
          },
        },
      ],
    }).validate(
      {
        v: 2,
      },
      errors => {
        expect(errors.length).toBe(3);
        expect(errors[0].message).toBe('e1');
        expect(errors[1].message).toBe('e2');
        expect(errors[2].message).toBe('e3');
        done();
      },
    );
  });

  it('first works', done => {
    new Schema({
      v: [
        {
          asyncValidator(rule, value) {
            return Promise.reject(new Error('e1'));
          },
        },
        {
          asyncValidator(rule, value) {
            return Promise.reject(new Error('e2'));
          },
        },
      ],
      v2: [
        {
          asyncValidator(rule, value) {
            return Promise.reject(new Error('e3'));
          },
        },
      ],
    }).validate(
      {
        v: 2,
        v2: 1,
      },
      {
        first: true,
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('e1');
        done();
      },
    );
  });

  describe('firstFields', () => {
    it('works for true', done => {
      new Schema({
        v: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e1'));
            },
          },
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e2'));
            },
          },
        ],

        v2: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e3'));
            },
          },
        ],
        v3: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e4'));
            },
          },
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e5'));
            },
          },
        ],
      }).validate(
        {
          v: 1,
          v2: 1,
          v3: 1,
        },
        {
          firstFields: true,
        },
        errors => {
          expect(errors.length).toBe(3);
          expect(errors[0].message).toBe('e1');
          expect(errors[1].message).toBe('e3');
          expect(errors[2].message).toBe('e4');
          done();
        },
      );
    });

    it('works for array', done => {
      new Schema({
        v: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e1'));
            },
          },
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e2'));
            },
          },
        ],

        v2: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e3'));
            },
          },
        ],
        v3: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e4'));
            },
          },
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e5'));
            },
          },
        ],
        v4: [
          {
            asyncValidator: () =>
              new Promise((resolve, reject) => {
                setTimeout(resolve, 100);
              }),
          },
          {
            asyncValidator: () =>
              new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('e6')), 100);
              }),
          },
        ],
      }).validate(
        {
          v: 1,
          v2: 1,
          v3: 1,
        },
        {
          firstFields: ['v'],
        },
        errors => {
          expect(errors.length).toBe(5);
          expect(errors[0].message).toBe('e1');
          expect(errors[1].message).toBe('e3');
          expect(errors[2].message).toBe('e4');
          expect(errors[3].message).toBe('e5');
          expect(errors[4].message).toBe('e6');
          done();
        },
      );
    });
    it("Whether to remove the 'Uncaught (in promise)' warning", async done => {
      let allCorrect = true;
      try {
        await new Schema({
          async: {
            asyncValidator(rule, value) {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject([new Error(rule.message)]);
                }, 100);
              });
            },
            message: 'async fails',
          },
        }).validate({
          v: 1,
        });
      } catch ({ errors }) {
        allCorrect = errors.length === 1;
      }
      expect(allCorrect).toBe(true);
      done();
    });
  });
});
