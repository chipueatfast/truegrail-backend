"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../sequelize/models");

var _user = _interopRequireDefault(require("./user.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var register =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, password, email, hash;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, password = _req$body.password, email = _req$body.email;
            _context.next = 3;
            return _user.default.checkEmailExistence(email);

          case 3:
            if (!_context.sent) {
              _context.next = 6;
              break;
            }

            res.sendStatus(400);
            return _context.abrupt("return");

          case 6:
            hash = _user.default.generateHash(password);

            _models.sequelize.User.create(_objectSpread({}, req.body, {
              passwordHash: hash
            })).then(function () {
              res.status(201).send({
                passwordHash: hash
              });
            }).catch(function (err) {
              console.log(err);
              res.sendStatus(403);
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // for them next iteration


var sendSaltAndHash = function sendSaltAndHash() {};

var retrievePublicInfo = function retrievePublicInfo(req, res) {
  res.send('last time 8');
};

var getSneakerCollection =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var address, collection;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            address = req.params.address;
            _context2.prev = 1;
            _context2.next = 4;
            return _models.sequelize.Sneaker.findAll({
              where: {
                ownerAddress: address
              }
            });

          case 4:
            collection = _context2.sent;

            if (collection && collection.length !== 0) {
              res.send(collection);
            } else {
              res.sendStatus(404);
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.sendStatus(500);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function getSneakerCollection(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  register: register,
  retrievePublicInfo: retrievePublicInfo,
  getSneakerCollection: getSneakerCollection
};
exports.default = _default;