import Schema from '../src/';

describe('unicode', () => {
  it('works for unicode U+0000 to U+FFFF ', done => {
    new Schema({
      v: {
        type: 'string',
        len: 4,
      },
    }).validate(
      {
        v: '吉吉吉吉',
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });

  it('works for unicode gt U+FFFF ', done => {
    new Schema({
      v: {
        type: 'string',
        len: 4, // 原来length属性应该为8，更正之后应该为4
      },
    }).validate(
      {
        v: '𠮷𠮷𠮷𠮷',
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });

  it('Rich Text Format', done => {
    new Schema({
      v: {
        type: 'string',
        len: 2,
      },
    }).validate(
      {
        v: '💩💩',
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });
});
