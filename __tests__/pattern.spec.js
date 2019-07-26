import Schema from '../src/';

describe('pattern', () => {
  it('works for non-required empty string', done => {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
      },
    }).validate(
      {
        // useful for web, input's value defaults to ''
        v: '',
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });

  it('work for non-required empty string with string regexp', done => {
    new Schema({
      v: {
        pattern: '^\\d+$',
        message: 'haha',
      },
    }).validate(
      {
        // useful for web, input's value defaults to ''
        v: 's',
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('haha');
        done();
      },
    );
  });

  it('works for required empty string', done => {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
        required: true,
      },
    }).validate(
      {
        // useful for web, input's value defaults to ''
        v: '',
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('haha');
        done();
      },
    );
  });

  it('works for non-required null', done => {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
      },
    }).validate(
      {
        v: null,
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });

  it('works for non-required undefined', done => {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
      },
    }).validate(
      {
        v: undefined,
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });

  it('works', done => {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
      },
    }).validate(
      {
        v: ' ',
      },
      errors => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('haha');
        done();
      },
    );
  });

  it('works for RegExp with global flag', done => {
    const schema = new Schema({
      v: {
        pattern: /global/g,
        message: 'haha',
      },
    });

    schema.validate(
      {
        v: 'globalflag',
      },
      errors => {
        expect(errors).toBe(null);
      },
    );

    schema.validate(
      {
        v: 'globalflag',
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });
});
