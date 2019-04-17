"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _oauth2Server = _interopRequireDefault(require("oauth2-server"));

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _oauth2Server.default({
  model: _model.default,
  accessTokenLifetime: 60 * 3,
  allowBearerTokensInQueryString: true
});

exports.default = _default;