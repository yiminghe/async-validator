import Schema from '../src/';

describe('deep', () => {
  it('deep array specific validation', done => {
    new Schema({
      v: {
        required: true,
        type: 'array',
        fields: {
          0: [{ type: 'string' }],
          1: [{ type: 'string' }],
        },
      },
    }).validate(
      {
        v: [1, 'b'],
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v.0 is not a string');
        done();
      },
    );
  });

  it('deep object specific validation', done => {
    new Schema({
      v: {
        required: true,
        type: 'object',
        fields: {
          a: [{ type: 'string' }],
          b: [{ type: 'string' }],
        },
      },
    }).validate(
      {
        v: {
          a: 1,
          b: 'c',
        },
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v.a is not a string');
        done();
      },
    );
  });

  describe('defaultField', () => {
    it('deep array all values validation', done => {
      new Schema({
        v: {
          required: true,
          type: 'array',
          defaultField: [{ type: 'string' }],
        },
      }).validate(
        {
          v: [1, 2, 'c'],
        },
        errors => {
          expect(errors.length).toBe(2);
          expect(errors[0].message).toBe('v.0 is not a string');
          expect(errors[1].message).toBe('v.1 is not a string');
          done();
        },
      );
    });

    it('will merge top validation', () => {
      const obj = {
        value: '',
        test: [
          {
            name: 'aa',
          },
        ],
      };

      const descriptor = {
        test: {
          type: 'array',
          min: 2,
          required: true,
          message: '至少两项',
          defaultField: [
            {
              type: 'object',
              required: true,
              message: 'test 必须有',
              fields: {
                name: {
                  type: 'string',
                  required: true,
                  message: 'name 必须有',
                },
              },
            },
          ],
        },
      };

      new Schema(descriptor).validate(obj, errors => {
        expect(errors).toMatchSnapshot();
      });
    });

    it('array & required works', done => {
      const descriptor = {
        testArray: {
          type: 'array',
          required: true,
          defaultField: [{ type: 'string' }],
        },
      };
      const record = {
        testArray: [],
      };
      const validator = new Schema(descriptor);
      validator.validate(record, (errors, fields) => {
        console.log(errors, fields);
        done();
      });
    });

    it('deep object all values validation', done => {
      new Schema({
        v: {
          required: true,
          type: 'object',
          defaultField: [{ type: 'string' }],
        },
      }).validate(
        {
          v: {
            a: 1,
            b: 'c',
          },
        },
        errors => {
          expect(errors.length).toBe(1);
          expect(errors[0].message).toBe('v.a is not a string');
          done();
        },
      );
    });
  });
});
