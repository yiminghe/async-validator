webpackJsonp([2],{

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _asyncValidator = __webpack_require__(2);

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var schema = new _asyncValidator2['default']({
  validator0: {
    asyncValidator: function asyncValidator(rule, value, callback) {
      setTimeout(function () {
        return callback('Validator0 message');
      }, 100);
    }
  },
  validator1: {
    asyncValidator: function asyncValidator() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return reject('Validator1 message');
        }, 100);
      });
    }
  }
}); /* eslint no-console:0 */

schema.validate({
  validator0: '0',
  validator1: '1'
}, {
  suppressWarning: true
}, function (errors, fields) {
  console.log('errors');
  console.log(errors);
  console.log('fields');
  console.log(fields);
});

console.log('end');

/***/ })

},[4]);
//# sourceMappingURL=async-validator.js.map