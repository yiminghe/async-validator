import Schema from '../src/';

describe('number', () => {
  it('works', done => {
    new Schema({
      v: {
        type: 'number',
      },
    }).validate(
      {
        v: '1',
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v is not a number');
        done();
      },
    );
  });

  it('works for no-required', done => {
    new Schema({
      v: {
        type: 'number',
      },
    }).validate(
      {
        v: undefined,
      },
      errors => {
        expect(errors).toBeFalsy();
        done();
      },
    );
  });

  it('works for no-required in case of empty string', done => {
    new Schema({
      v: {
        type: 'number',
        required: false,
      },
    }).validate(
      {
        v: '',
      },
      errors => {
        expect(errors).toBeFalsy();
        done();
      },
    );
  });

  it('works for required', done => {
    new Schema({
      v: {
        type: 'number',
        required: true,
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

  it('transform does not change value', done => {
    const value = {
      v: '1',
    };
    new Schema({
      v: {
        type: 'number',
        transform: Number,
      },
    }).validate(value, errors => {
      expect(value.v).toBe('1');
      expect(errors).toBeFalsy();
      done();
    });
  });
});
