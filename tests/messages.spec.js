const expect = require('expect.js');
const Schema = require('../index');

describe('messages', () => {
  it('can call messages', (done) => {
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
    schema.validate({
      v: '',
      v2: '1',
    }, (errors) => {
      expect(errors.length).to.be(2);
      expect(errors[0].message).to.be('v required!');
      expect(errors[1].message).to.be('v2 is not an array');
      expect(Object.keys(messages).length).to.be(1);
      done();
    });
  });


  it('can use options.messages', (done) => {
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
    schema.validate({
      v: '',
      v2: '1',
    }, {
      messages,
    }, (errors) => {
      expect(errors.length).to.be(2);
      expect(errors[0].message).to.be('v required!');
      expect(errors[1].message).to.be('v2 is not an array');
      expect(Object.keys(messages).length).to.be(1);
      done();
    });
  });

  it('message can be object', (done) => {
    const atom = {};
    const messages = {
      required: atom,
    };
    const schema = new Schema({
      v: {
        required: true,
      },
    });
    schema.validate({
      v: '',
    }, {
      messages,
    }, (errors) => {
      expect(errors).to.be.ok();
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be(atom);
      expect(Object.keys(messages).length).to.be(1);
      expect(messages.required).to.be(atom);
      done();
    });
  });
});
