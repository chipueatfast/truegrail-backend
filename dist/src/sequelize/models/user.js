'use strict';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refreshToken: DataTypes.STRING
  }, {});

  User.associate = function (models) {// associations can be defined here
  };

  User.prototype.serialize = function () {
    return _objectSpread({}, this.dataValues, {
      passwordHash: undefined
    });
  };

  return User;
};