const expect = require('expect.js');
const Schema = require('../index');

describe('url', () => {
  it('works for type url', (done) => {
    new Schema({
      v: {
        type: 'url',
      },
    }).validate({
      v: 'http://www.taobao.com',
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for type url has query', (done) => {
    new Schema({
      v: {
        type: 'url',
      },
    }).validate({
      v: 'http://www.taobao.com/abc?a=a',
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for type url has hash', (done) => {
    new Schema({
      v: {
        type: 'url',
      },
    }).validate({
      v: 'http://www.taobao.com/abc#!abc',
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for type url has query and has', (done) => {
    new Schema({
      v: {
        type: 'url',
      },
    }).validate({
      v: 'http://www.taobao.com/abc?abc=%23&b=a~c#abc',
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for type url has query and has space', (done) => {
    new Schema({
      v: {
        type: 'url',
      },
    }).validate({
      v: 'http://www.taobao.com/abc?abc=%23&b=a~c#abc  ',
    }, (errors) => {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for type not a valid url', (done) => {
    new Schema({
      v: {
        type: 'url',
      },
    }).validate({
      v: 'http://www.taobao.com/abc?abc=%23&b=  a~c#abc    ',
    }, (errors) => {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is not a valid url');
      done();
    });
  });
});
