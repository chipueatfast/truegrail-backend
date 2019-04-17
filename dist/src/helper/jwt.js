"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressJwt = _interopRequireDefault(require("express-jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = function jwt() {
  var secret = process.env.SECRET;
  return (0, _expressJwt.default)({
    secret: secret
  }).unless({
    path: ['user/authenticate']
  });
};

var _default = jwt;
exports.default = _default;