
import Schema from '../src/';

describe('string', () => {
  it('works for none require', (done) => {
    new Schema({
      v: {
        type: 'string',
      },
    }).validate({
      v: '',
    }, (errors) => {
      expect(errors).toBe(null);
      done();
    });
  });

  it('works for empty string', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
      },
    }).validate({
      v: '',
    }, (errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('v is required');
      done();
    });
  });

  it('works for undefined string', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
      },
    }).validate({
      v: undefined,
    }, (errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('v is required');
      done();
    });
  });

  it('works for null string', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
      },
    }).validate({
      v: null,
    }, (errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('v is required');
      done();
    });
  });

  it('works for message', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
        message: 'haha',
      },
    }).validate({
      v: null,
    }, (errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('haha');
      done();
    });
  });

  it('works for none empty', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
        message: 'haha',
      },
    }).validate({
      v: ' ',
    }, (errors) => {
      expect(errors).toBe(null);
      done();
    });
  });

  it('works for whitespace empty', (done) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
        whitespace: true,
        message: 'haha',
      },
    }).validate({
      v: ' ',
    }, (errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('haha');
      done();
    });
  });

  it('works for unicode U+0000 to U+FFFF ', (done) => {
    new Schema({
      v: {
        type: 'string',
        len: 3,
        message: 'haha',
      },
    }).validate({
      v: '吉吉吉吉',
    }, (errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('haha');
      done();
    });
  });

  it('works for unicode gt U+FFFF ', (done) => {
    new Schema({
      v: {
        type: 'string',
        len: 8, // 原来length属性应该为8，更正之后应该为4
        message: 'haha',
      },
    }).validate({
      v: '𠮷𠮷𠮷𠮷',
    }, (errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].message).toBe('haha');
      done();
    });
  });
});
