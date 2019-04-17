"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../sequelize/models");

var _database = _interopRequireDefault(require("../service/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getFactory =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var address, factory;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            address = req.params.address;
            _context.next = 3;
            return _models.sequelize.Factory.find({
              where: {
                blockchainAddress: address
              }
            });

          case 3:
            factory = _context.sent;

            if (factory) {
              _context.next = 7;
              break;
            }

            res.sendStatus(404);
            return _context.abrupt("return");

          case 7:
            res.send(factory);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getFactory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var addFactory =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var newFactory;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _database.default.createSingleRowAsync('Factory', req.body);

          case 2:
            newFactory = _context2.sent;

            if (newFactory) {
              res.sendStatus(201);
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addFactory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  getFactory: getFactory,
  addFactory: addFactory
};
exports.default = _default;