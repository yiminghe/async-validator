webpackJsonp([0],{

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(132);


/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _asyncValidator = __webpack_require__(35);

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var schema = new _asyncValidator2['default']({
  validator0: {
    validator: function validator(rule, value) {
      return true;
    }
  },
  validator1: {
    validator: function validator(rule, value) {
      return false;
    }
  },
  validator2: {
    validator: function validator(rule, value) {
      return false;
    },

    message: 'Customize error messages1'
  },
  validator3: {
    validator: function validator(rule, value) {
      return new Error('Customize error messages2');
    }
  },
  validator4: {
    validator: function validator(rule, value) {
      return ['Error message 1', 'Error message 2', 'Error message 3'];
    }
  },
  validator5: {
    validator: function validator(rule, value, callback) {
      setTimeout(function () {
        return callback('Compatible with older USES');
      }, 100);
    }
  }
}); /* eslint no-console:0 no-unused-vars:0 */

schema.validate({
  validator0: '0',
  validator1: '1',
  validator2: '2',
  validator3: '3',
  validator4: '4'
}, function (errors, fields) {
  console.log('errors');
  console.log(errors);
  console.log('fields');
  console.log(fields);
});

console.log('end');

/***/ })

},[131]);
//# sourceMappingURL=validator.js.map