import { convertFieldsError } from '../src/util'

describe('utils', () => {
  it('convertFieldsError', (done) => {
    expect(convertFieldsError([{ field: 'somekey', message: 'haha' }])).toEqual({
      somekey: [{ field: 'somekey', message: 'haha' }],
    });
    done();
  });
});
