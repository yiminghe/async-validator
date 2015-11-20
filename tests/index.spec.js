var expect = require('expect.js');
var Schema = require('../index');

describe('async-validator', function () {
  describe('string', function () {
    it('works for none require', function (done) {
      new Schema({
        v: {
          type: 'string'
        }
      }).validate({
        v: ''
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });

    it('works for empty string', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'string'
        }
      }).validate({
        v: ''
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v is required')
        done();
      })
    });

    it('works for undefined string', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'string'
        }
      }).validate({
        v: undefined
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v is required')
        done();
      })
    });

    it('works for null string', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'string'
        }
      }).validate({
        v: null
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v is required')
        done();
      })
    });

    it('works for message', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'string',
          message: 'haha'
        }
      }).validate({
        v: null
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('haha')
        done();
      })
    });

    it('works for none empty', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'string',
          message: 'haha'
        }
      }).validate({
        v: ' '
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });

    it('works for whitespace empty', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'string',
          whitespace: true,
          message: 'haha'
        }
      }).validate({
        v: ' '
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('haha')
        done();
      })
    });
  });

  describe('array', function () {
    it('works for type', function (done) {
      new Schema({
        v: {
          type: 'array'
        }
      }).validate({
        v: ''
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v is not an array');
        done();
      })
    });

    it('works for type and required', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'array'
        }
      }).validate({
        v: ''
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v is not an array');
        done();
      })
    });


    it('works for none require', function (done) {
      new Schema({
        v: {
          type: 'array'
        }
      }).validate({
        v: []
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });

    it('works for empty array', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'array'
        }
      }).validate({
        v: []
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v is required')
        done();
      })
    });

    it('works for undefined array', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'array'
        }
      }).validate({
        v: undefined
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v is required')
        done();
      })
    });

    it('works for null array', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'array'
        }
      }).validate({
        v: null
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v is required')
        done();
      })
    });

    it('works for none empty', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'array',
          message: 'haha'
        }
      }).validate({
        v: [1]
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });
  });

  describe('pattern', function () {
    it('works for non-required empty string', function (done) {
      new Schema({
        v: {
          pattern: /^\d+$/,
          message: 'haha'
        }
      }).validate({
        // useful for web, input's value defaults to ''
        v: ''
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });

    it('works for non-required null', function (done) {
      new Schema({
        v: {
          pattern: /^\d+$/,
          message: 'haha'
        }
      }).validate({
        v: null
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });

    it('works for non-required undefined', function (done) {
      new Schema({
        v: {
          pattern: /^\d+$/,
          message: 'haha'
        }
      }).validate({
        v: undefined
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });

    it('works', function (done) {
      new Schema({
        v: {
          pattern: /^\d+$/,
          message: 'haha'
        }
      }).validate({
        v: ' '
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('haha');
        done();
      })
    });
  });

  describe('url', function () {
    it('works for type url', function (done) {
      new Schema({
        v: {
          type: 'url'
        }
      }).validate({
        v: 'http://www.taobao.com'
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });
    
    it('works for type url has query', function (done) {
      new Schema({
        v: {
          type: 'url'
        }
      }).validate({
        v: 'http://www.taobao.com/abc?a=a'
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });
    
    it('works for type url has hash', function (done) {
      new Schema({
        v: {
          type: 'url'
        }
      }).validate({
        v: 'http://www.taobao.com/abc#!abc'
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });
    
    it('works for type url has query and has', function (done) {
      new Schema({
        v: {
          type: 'url'
        }
      }).validate({
        v: 'http://www.taobao.com/abc?abc=%23&b=a~c#abc'
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });
    
    it('works for type url has query and has space', function (done) {
      new Schema({
        v: {
          type: 'url'
        }
      }).validate({
        v: 'http://www.taobao.com/abc?abc=%23&b=a~c#abc       '
      }, function (errors) {
        expect(errors).to.be(null);
        done();
      })
    });
    
    
    it('works for type not a valid url', function (done) {
      new Schema({
        v: {
          type: 'url'
        }
      }).validate({
        v: 'http://www.taobao.com/abc?abc=%23&b=  a~c#abc    '
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v is not a valid url')
        done();
      })
    });
  });
});
