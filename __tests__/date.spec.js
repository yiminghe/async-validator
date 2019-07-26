import Schema from '../src/';

describe('date', () => {
  it('required works for undefined', done => {
    new Schema({
      v: {
        type: 'date',
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

  it('required works for ""', done => {
    new Schema({
      v: {
        type: 'date',
        required: true,
      },
    }).validate(
      {
        v: '',
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('v is not a date');
        done();
      },
    );
  });

  it('required works for "timestamp"', done => {
    new Schema({
      v: {
        type: 'date',
        required: true,
      },
    }).validate(
      {
        v: 1530374400000,
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });
});
