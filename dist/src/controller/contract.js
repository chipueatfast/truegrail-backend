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

var getContract =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var contract;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database.default.getSingleValueAsync('Contract', 'name', req.params.name);

          case 2:
            contract = _context.sent;

            if (contract) {
              _context.next = 6;
              break;
            }

            res.sendStatus(404);
            return _context.abrupt("return");

          case 6:
            return _context.abrupt("return", res.send(contract));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getContract(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createOrUpdateContract =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var existingContract, newContract;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _database.default.getSingleValueAsync('Contract', 'name', req.body.name);

          case 2:
            existingContract = _context2.sent;

            if (existingContract) {
              _context2.next = 10;
              break;
            }

            _context2.next = 6;
            return _database.default.createSingleRowAsync('Contract', req.body);

          case 6:
            newContract = _context2.sent;

            if (!newContract) {
              _context2.next = 10;
              break;
            }

            res.sendStatus(201);
            return _context2.abrupt("return");

          case 10:
            _context2.prev = 10;
            existingContract.update({
              jsonContent: req.jsonContent
            }).then(function () {
              return res.sendStatus(203);
            });
            return _context2.abrupt("return");

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](10);
            res.sendStatus(500);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[10, 15]]);
  }));

  return function createOrUpdateContract(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getContractCreator =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var contract;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.sequelize.Contract.find({
              where: {
                name: req.params.contractName
              },
              attributes: ['creator']
            });

          case 2:
            contract = _context3.sent;

            if (contract) {
              _context3.next = 6;
              break;
            }

            res.sendStatus(404);
            return _context3.abrupt("return");

          case 6:
            return _context3.abrupt("return", res.send({
              creator: contract.creator
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getContractCreator(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  getContract: getContract,
  createOrUpdateContract: createOrUpdateContract,
  getContractCreator: getContractCreator
};
exports.default = _default;