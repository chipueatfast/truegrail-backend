"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../sequelize/models");

// for the blacklist implementation
function saveRefreshToken(userId, refreshToken) {
  return _models.sequelize.User.findByPk(userId).then(function (user) {
    user.update({
      refreshToken: refreshToken
    });
  });
}

function retrieveUserAuthInfo(username) {
  return _models.sequelize.User.find({
    where: {
      email: username
    }
  }).then(function (user) {
    return user ? {
      savedHash: user.passwordHash
    } : null;
  });
}

function retrieveUserPublicInfo(username) {
  return _models.sequelize.User.find({
    where: {
      email: username
    }
  }).then(function (user) {
    return user.serialize();
  });
}

var _default = {
  retrieveUserAuthInfo: retrieveUserAuthInfo,
  retrieveUserPublicInfo: retrieveUserPublicInfo,
  saveRefreshToken: saveRefreshToken
};
exports.default = _default;