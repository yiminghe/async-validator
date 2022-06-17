import Schema from '../src';

describe('validator', () => {
  it('works', done => {
    new Schema({
      v: [
        {
          validator(rule, value, callback) {
            callback(new Error('e1'));
          },
        },
        {
          validator(rule, value, callback) {
            callback(new Error('e2'));
          },
        },
      ],
      v2: [
        {
          validator(rule, value, callback) {
            callback(new Error('e3'));
          },
        },
      ],
      v3: [
        {
          validator() {
            return false;
          },
        },
        {
          validator() {
            return new Error('e5');
          },
        },
        {
          validator() {
            return false;
          },
          message: 'e6',
        },
        {
          validator() {
            return true;
          },
        },
        // Customize with empty message
        {
          validator() {
            return false;
          },
          message: '',
        },
      ],
    }).validate(
      {
        v: 2,
      },
      errors => {
        expect(errors.length).toBe(7);
        expect(errors[0].message).toBe('e1');
        expect(errors[1].message).toBe('e2');
        expect(errors[2].message).toBe('e3');
        expect(errors[3].message).toBe('v3 fails');
        expect(errors[4].message).toBe('e5');
        expect(errors[5].message).toBe('e6');
        expect(errors[6].message).toBe('');
        done();
      },
    );
  });

  it('first works', done => {
    new Schema({
      v: [
        {
          validator(rule, value, callback) {
            callback(new Error('e1'));
          },
        },
        {
          validator(rule, value, callback) {
            callback(new Error('e2'));
          },
        },
      ],
      v2: [
        {
          validator(rule, value, callback) {
            callback(new Error('e3'));
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
            validator(rule, value, callback) {
              callback(new Error('e1'));
            },
          },
          {
            validator(rule, value, callback) {
              callback(new Error('e2'));
            },
          },
        ],

        v2: [
          {
            validator(rule, value, callback) {
              callback(new Error('e3'));
            },
          },
        ],
        v3: [
          {
            validator(rule, value, callback) {
              callback(new Error('e4'));
            },
          },
          {
            validator(rule, value, callback) {
              callback(new Error('e5'));
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
            validator(rule, value, callback) {
              callback(new Error('e1'));
            },
          },
          {
            validator(rule, value, callback) {
              callback(new Error('e2'));
            },
          },
        ],

        v2: [
          {
            validator(rule, value, callback) {
              callback(new Error('e3'));
            },
          },
        ],
        v3: [
          {
            validator(rule, value, callback) {
              callback(new Error('e4'));
            },
          },
          {
            validator(rule, value, callback) {
              callback(new Error('e5'));
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
          firstFields: ['v'],
        },
        errors => {
          expect(errors.length).toBe(4);
          expect(errors[0].message).toBe('e1');
          expect(errors[1].message).toBe('e3');
          expect(errors[2].message).toBe('e4');
          expect(errors[3].message).toBe('e5');
          done();
        },
      );
    });
  });

  describe('promise api', () => {
    it('works', done => {
      new Schema({
        v: [
          {
            validator(rule, value, callback) {
              callback(new Error('e1'));
            },
          },
          {
            validator(rule, value, callback) {
              callback(new Error('e2'));
            },
          },
        ],
        v2: [
          {
            validator(rule, value, callback) {
              callback(new Error('e3'));
            },
          },
        ],
        v3: [
          {
            validator() {
              return false;
            },
          },
          {
            validator() {
              return new Error('e5');
            },
          },
          {
            validator() {
              return false;
            },
            message: 'e6',
          },
          {
            validator() {
              return true;
            },
          },
        ],
      })
        .validate({
          v: 2,
        })
        .catch(({ errors, fields }) => {
          expect(errors.length).toBe(6);
          expect(errors[0].message).toBe('e1');
          expect(errors[1].message).toBe('e2');
          expect(errors[2].message).toBe('e3');
          expect(errors[3].message).toBe('v3 fails');
          expect(errors[4].message).toBe('e5');
          expect(errors[5].message).toBe('e6');
          expect(fields.v[0].fieldValue).toBe(2);
          expect(fields).toMatchInlineSnapshot(`
            Object {
              "v": Array [
                [Error: e1],
                [Error: e2],
              ],
              "v2": Array [
                [Error: e3],
              ],
              "v3": Array [
                Object {
                  "field": "v3",
                  "fieldValue": undefined,
                  "message": "v3 fails",
                },
                Object {
                  "field": "v3",
                  "fieldValue": undefined,
                  "message": "e5",
                },
                Object {
                  "field": "v3",
                  "fieldValue": undefined,
                  "message": "e6",
                },
              ],
            }
          `);
          done();
        });
    });

    it('first works', done => {
      new Schema({
        v: [
          {
            validator(rule, value, callback) {
              callback(new Error('e1'));
            },
          },
          {
            validator(rule, value, callback) {
              callback(new Error('e2'));
            },
          },
        ],
        v2: [
          {
            validator(rule, value, callback) {
              callback(new Error('e3'));
            },
          },
        ],
      })
        .validate(
          {
            v: 2,
            v2: 1,
          },
          {
            first: true,
          },
        )
        .catch(({ errors }) => {
          expect(errors.length).toBe(1);
          expect(errors[0].message).toBe('e1');
          done();
        });
    });

    describe('firstFields', () => {
      it('works for true', done => {
        new Schema({
          v: [
            {
              validator(rule, value, callback) {
                callback(new Error('e1'));
              },
            },
            {
              validator(rule, value, callback) {
                callback(new Error('e2'));
              },
            },
          ],

          v2: [
            {
              validator(rule, value, callback) {
                callback(new Error('e3'));
              },
            },
          ],
          v3: [
            {
              validator(rule, value, callback) {
                callback(new Error('e4'));
              },
            },
            {
              validator(rule, value, callback) {
                callback(new Error('e5'));
              },
            },
          ],
        })
          .validate(
            {
              v: 1,
              v2: 1,
              v3: 1,
            },
            {
              firstFields: true,
            },
          )
          .catch(({ errors }) => {
            expect(errors.length).toBe(3);
            expect(errors[0].message).toBe('e1');
            expect(errors[1].message).toBe('e3');
            expect(errors[2].message).toBe('e4');
            done();
          });
      });

      it('works for array', done => {
        new Schema({
          v: [
            {
              validator(rule, value, callback) {
                callback(new Error('e1'));
              },
            },
            {
              validator(rule, value, callback) {
                callback(new Error('e2'));
              },
            },
          ],

          v2: [
            {
              validator(rule, value, callback) {
                callback(new Error('e3'));
              },
            },
          ],
          v3: [
            {
              validator(rule, value, callback) {
                callback(new Error('e4'));
              },
            },
            {
              validator(rule, value, callback) {
                callback(new Error('e5'));
              },
            },
          ],
        })
          .validate(
            {
              v: 1,
              v2: 1,
              v3: 1,
            },
            {
              firstFields: ['v'],
            },
          )
          .catch(({ errors }) => {
            expect(errors.length).toBe(4);
            expect(errors[0].message).toBe('e1');
            expect(errors[1].message).toBe('e3');
            expect(errors[2].message).toBe('e4');
            expect(errors[3].message).toBe('e5');
            done();
          });
      });

      it('works for no rules fields', done => {
        new Schema({
          v: [],
          v2: [],
        })
          .validate({
            v: 2,
            v2: 1,
          })
          .then(source => {
            expect(source).toMatchObject({ v: 2, v2: 1 });
            done();
          });
      });
    });
  });

  it('custom validate function throw error', done => {
    new Schema({
      v: [
        {
          validator(rule, value, callback) {
            throw new Error('something wrong');
          },
        },
      ],
    })
      .validate(
        { v: '' },
        {
          suppressValidatorError: true,
        },
      )
      .catch(({ errors }) => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('something wrong');
        done();
      });
  });
});
