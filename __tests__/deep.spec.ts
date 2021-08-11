import Schema, { Rules } from '../src';

describe('deep', () => {
  it('deep array specific validation', done => {
    new Schema({
      v: {
        required: true,
        type: 'array',
        fields: {
          '0': [{ type: 'string' }],
          '1': [{ type: 'string' }],
        },
      },
    }).validate(
      {
        v: [1, 'b'],
      },
      (errors, fields) => {
        expect(errors.length).toBe(1);
        expect(fields).toMatchInlineSnapshot(`
          Object {
            "v.0": Array [
              Object {
                "field": "v.0",
                "fieldValue": 1,
                "message": "v.0 is not a string",
              },
            ],
          }
        `);
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
      (errors, fields) => {
        expect(errors.length).toBe(1);
        expect(fields).toMatchInlineSnapshot(`
          Object {
            "v.a": Array [
              Object {
                "field": "v.a",
                "fieldValue": 1,
                "message": "v.a is not a string",
              },
            ],
          }
        `);
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
        (errors, fields) => {
          expect(errors.length).toBe(2);
          expect(fields).toMatchInlineSnapshot(`
            Object {
              "v.0": Array [
                Object {
                  "field": "v.0",
                  "fieldValue": 1,
                  "message": "v.0 is not a string",
                },
              ],
              "v.1": Array [
                Object {
                  "field": "v.1",
                  "fieldValue": 2,
                  "message": "v.1 is not a string",
                },
              ],
            }
          `);
          expect(errors[0].message).toBe('v.0 is not a string');
          expect(errors[1].message).toBe('v.1 is not a string');
          done();
        },
      );
    });

    it('deep transform array all values validation', done => {
      new Schema({
        v: {
          required: true,
          type: 'array',
          defaultField: [{ type: 'number', max: 0, transform: Number }],
        },
      }).validate(
        {
          v: ['1', '2'],
        },
        (errors, fields) => {
          expect(errors.length).toBe(2);
          expect(fields).toMatchInlineSnapshot(`
            Object {
              "v.0": Array [
                Object {
                  "field": "v.0",
                  "fieldValue": 1,
                  "message": "v.0 cannot be greater than 0",
                },
              ],
              "v.1": Array [
                Object {
                  "field": "v.1",
                  "fieldValue": 2,
                  "message": "v.1 cannot be greater than 0",
                },
              ],
            }
          `);
          expect(errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "v.0",
                "fieldValue": 1,
                "message": "v.0 cannot be greater than 0",
              },
              Object {
                "field": "v.1",
                "fieldValue": 2,
                "message": "v.1 cannot be greater than 0",
              },
            ]
          `);
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

      const descriptor: Rules = {
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
        expect(errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "field": "test",
              "fieldValue": Array [
                Object {
                  "name": "aa",
                },
              ],
              "message": "至少两项",
            },
          ]
        `);
      });
    });

    it('array & required works', done => {
      const descriptor: Rules = {
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
