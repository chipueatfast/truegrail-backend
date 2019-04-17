"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _models = require("../sequelize/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function generateHash(password) {
  var saltRounds = 10;
  return _bcrypt.default.hashSync(password, saltRounds);
}

function checkEmailExistence(_x) {
  return _checkEmailExistence.apply(this, arguments);
}

function _checkEmailExistence() {
  _checkEmailExistence = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(email) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _models.sequelize.User.find({
              where: {
                email: email
              }
            }).then(function (user) {
              return !!user;
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkEmailExistence.apply(this, arguments);
}

var _default = {
  checkEmailExistence: checkEmailExistence,
  generateHash: generateHash
};
exports.default = _default;