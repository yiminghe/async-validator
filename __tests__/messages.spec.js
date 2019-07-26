import Schema from '../src/';

describe('messages', () => {
  it('can call messages', done => {
    const messages = {
      required(f) {
        return `${f} required!`;
      },
    };
    const schema = new Schema({
      v: {
        required: true,
      },
      v2: {
        type: 'array',
      },
    });
    schema.messages(messages);
    schema.validate(
      {
        v: '',
        v2: '1',
      },
      errors => {
        expect(errors.length).toBe(2);
        expect(errors[0].message).toBe('v required!');
        expect(errors[1].message).toBe('v2 is not an array');
        expect(Object.keys(messages).length).toBe(1);
        done();
      },
    );
  });

  it('can use options.messages', done => {
    const messages = {
      required(f) {
        return `${f} required!`;
      },
    };
    const schema = new Schema({
      v: {
        required: true,
      },
      v2: {
        type: 'array',
      },
    });
    schema.validate(
      {
        v: '',
        v2: '1',
      },
      {
        messages,
      },
      errors => {
        expect(errors.length).toBe(2);
        expect(errors[0].message).toBe('v required!');
        expect(errors[1].message).toBe('v2 is not an array');
        expect(Object.keys(messages).length).toBe(1);
        done();
      },
    );
  });

  it('message can be object', done => {
    const atom = {};
    const messages = {
      required: atom,
    };
    const schema = new Schema({
      v: {
        required: true,
      },
    });
    schema.validate(
      {
        v: '',
      },
      {
        messages,
      },
      errors => {
        expect(errors).toBeTruthy();
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe(atom);
        expect(Object.keys(messages).length).toBe(1);
        expect(messages.required).toBe(atom);
        done();
      },
    );
  });

  it('message can be a function', done => {
    const message = 'this is a function';
    new Schema({
      v: {
        required: true,
        message: () => message,
      },
    }).validate(
      {
        v: '', // provide empty value, this will trigger the message.
      },
      errors => {
        expect(errors).toBeTruthy();
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe(message);
        done();
      },
    );
  });
});
