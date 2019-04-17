"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectHash = _interopRequireDefault(require("object-hash"));

var _models = require("../sequelize/models");

var _database = _interopRequireDefault(require("../service/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getSneaker =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var sneaker, brand, model, colorway, id, condition, releaseDate, limitedEdition, size, ownerAddress, owner, factory;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database.default.getSingleValueAsync('Sneaker', 'id', req.params.id);

          case 2:
            sneaker = _context.sent;

            if (!sneaker) {
              _context.next = 12;
              break;
            }

            brand = sneaker.brand, model = sneaker.model, colorway = sneaker.colorway, id = sneaker.id, condition = sneaker.condition, releaseDate = sneaker.releaseDate, limitedEdition = sneaker.limitedEdition, size = sneaker.size, ownerAddress = sneaker.ownerAddress; // get owner infomation 

            if (!(condition === 'issued')) {
              _context.next = 10;
              break;
            }

            _context.next = 8;
            return _database.default.getSingleValueAsync('Factory', 'blockchainAddress', ownerAddress);

          case 8:
            factory = _context.sent;

            if (factory) {
              owner = {
                brand: factory.brand,
                physicalAddress: factory.physicalAddress,
                blockchainAddress: factory.blockchainAddress
              };
            }

          case 10:
            res.send({
              detail: sneaker,
              hash: (0, _objectHash.default)({
                id: id,
                brand: brand,
                model: model,
                colorway: colorway,
                condition: condition,
                releaseDate: releaseDate,
                limitedEdition: limitedEdition,
                size: size
              }),
              owner: owner
            });
            return _context.abrupt("return");

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSneaker(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var addSneaker =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var newSneaker;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _database.default.createSingleRowAsync('Sneaker', req.body);

          case 3:
            newSneaker = _context2.sent;

            if (!newSneaker) {
              _context2.next = 7;
              break;
            }

            res.sendStatus(201);
            return _context2.abrupt("return");

          case 7:
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function addSneaker(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  addSneaker: addSneaker,
  getSneaker: getSneaker
};
exports.default = _default;