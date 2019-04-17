"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getAccessToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _models = require("../sequelize/models");

var _authentication = _interopRequireDefault(require("../service/authentication"));

var _database = _interopRequireDefault(require("../service/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAccessToken = function getAccessToken(accessToken) {
  var verifiedToken = _jsonwebtoken.default.verify(accessToken, process.env.SECRET);

  verifiedToken.accessTokenExpiresAt = new Date(verifiedToken.accessTokenExpiresAt);
  return verifiedToken;
};

exports.getAccessToken = getAccessToken;

var saveToken = function saveToken(token, client, user) {
  var saveRefreshToken = _authentication.default.saveRefreshToken;
  var refreshToken = token.refreshToken,
      accessTokenExpiresAt = token.accessTokenExpiresAt;
  saveRefreshToken(user.id, refreshToken);
  var firstName = user.firstName,
      lastName = user.lastName,
      email = user.email;
  token.accessToken = _jsonwebtoken.default.sign({
    user: {
      firstName: firstName,
      lastName: lastName,
      email: email
    },
    accessTokenExpiresAt: accessTokenExpiresAt
  }, process.env.SECRET);
  token.client = client;
  token.user = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };
  return token;
};

var getRefreshToken =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(refreshToken) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database.default.getSingleValueAsync('User', 'refreshToken', refreshToken);

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", null);

          case 5:
            return _context.abrupt("return", {
              refreshToken: refreshToken,
              client: {
                clientId: 'truegrail',
                clientSecret: 'secret'
              },
              user: user.dataValues
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getRefreshToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

var revokeToken = function revokeToken(token) {
  // this can be where we store the blacklist
  return true;
};

var getUser =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(username, password) {
    var retrieveUserAuthInfo, retrieveUserPublicInfo, authInfo, savedHash;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            retrieveUserAuthInfo = _authentication.default.retrieveUserAuthInfo, retrieveUserPublicInfo = _authentication.default.retrieveUserPublicInfo;
            _context2.next = 3;
            return retrieveUserAuthInfo(username);

          case 3:
            authInfo = _context2.sent;

            if (!authInfo) {
              _context2.next = 10;
              break;
            }

            savedHash = authInfo.savedHash;

            if (!_bcrypt.default.compareSync(password, savedHash)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 9;
            return retrieveUserPublicInfo(username);

          case 9:
            return _context2.abrupt("return", _context2.sent);

          case 10:
            return _context2.abrupt("return", null);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUser(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getClient = function getClient(clientId, clientSecret) {
  if (clientId === 'truegrailmobile' && clientSecret === 'secret') {
    return {
      grants: ['password', 'refresh_token']
    };
  }
};

var _default = {
  getAccessToken: getAccessToken,
  getRefreshToken: getRefreshToken,
  getClient: getClient,
  getUser: getUser,
  saveToken: saveToken,
  revokeToken: revokeToken
};
exports.default = _default;