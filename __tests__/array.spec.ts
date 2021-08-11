import Schema from '../src';

describe('array', () => {
  it('works for type', done => {
    new Schema({
      v: {
        type: 'array',
      },
    }).validate(
      {
        v: '',
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v is not an array');
        done();
      },
    );
  });

  it('works for type and required', done => {
    new Schema({
      v: {
        required: true,
        type: 'array',
      },
    }).validate(
      {
        v: '',
      },
      (errors, fields) => {
        expect(errors.length).toBe(1);
        expect(fields).toMatchInlineSnapshot(`
          Object {
            "v": Array [
              Object {
                "field": "v",
                "fieldValue": "",
                "message": "v is not an array",
              },
            ],
          }
        `);
        expect(errors[0].message).toBe('v is not an array');
        done();
      },
    );
  });

  it('works for none require', done => {
    new Schema({
      v: {
        type: 'array',
      },
    }).validate(
      {
        v: [],
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });

  it('works for empty array', done => {
    new Schema({
      v: {
        required: true,
        type: 'array',
      },
    }).validate(
      {
        v: [],
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v is required');
        done();
      },
    );
  });

  it('works for undefined array', done => {
    new Schema({
      v: {
        required: true,
        type: 'array',
      },
    }).validate(
      {
        v: undefined,
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v is required');
        done();
      },
    );
  });

  it('works for null array', done => {
    new Schema({
      v: {
        required: true,
        type: 'array',
      },
    }).validate(
      {
        v: null,
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v is required');
        done();
      },
    );
  });

  it('works for none empty', done => {
    new Schema({
      v: {
        required: true,
        type: 'array',
        message: 'haha',
      },
    }).validate(
      {
        v: [1],
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });

  it('works for empty array with min', done => {
    new Schema({
      v: {
        min: 1,
        max: 3,
        type: 'array',
      },
    }).validate(
      {
        v: [],
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v must be between 1 and 3 in length');
        done();
      },
    );
  });

  it('works for empty array with max', done => {
    new Schema({
      v: {
        min: 1,
        max: 3,
        type: 'array',
      },
    }).validate(
      {
        v: [1, 2, 3, 4],
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v must be between 1 and 3 in length');
        done();
      },
    );
  });
});
