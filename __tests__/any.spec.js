import Schema from '../src/';

const testNoErrorsFor = value => done => {
  new Schema({
    v: {
      type: 'any',
    },
  }).validate(
    {
      v: value,
    },
    errors => {
      expect(errors).toBe(null);
      done();
    },
  );
};

const testRequiredErrorFor = value => done => {
  new Schema({
    v: {
      required: true,
      type: 'string',
    },
  }).validate(
    {
      v: value,
    },
    errors => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('v is required');
      done();
    },
  );
};

const testRequiredErrorWithDisplayFieldFor = value => done => {
  new Schema({
    v: {
      required: true,
      type: 'string',
      displayField: 'V',
    },
  }).validate(
    {
      v: value,
    },
    errors => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('V is required');
      done();
    },
  );
};

describe('any', () => {
  it('allows null', testNoErrorsFor(null));
  it('allows undefined', testNoErrorsFor(undefined));
  it('allows strings', testNoErrorsFor('foo'));
  it('allows numbers', testNoErrorsFor(1));
  it('allows booleans', testNoErrorsFor(false));
  it('allows arrays', testNoErrorsFor([]));
  it('allows objects', testNoErrorsFor({}));
  it('rejects undefined when required', testRequiredErrorFor(undefined));
  it('rejects null when required', testRequiredErrorFor(null));
  it(
    'rejects undefined with display field when required',
    testRequiredErrorWithDisplayFieldFor(undefined),
  );
  it(
    'rejects null with display field when required',
    testRequiredErrorWithDisplayFieldFor(null),
  );
});
