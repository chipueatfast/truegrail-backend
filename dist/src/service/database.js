"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../sequelize/models");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSingleValueAsync = function getSingleValueAsync(object, prop, value) {
  return _models.sequelize[object].find({
    where: _defineProperty({}, prop, value)
  });
};

var createSingleRowAsync = function createSingleRowAsync(tableName, rowData) {
  return _models.sequelize[tableName].create(rowData);
};

var _default = {
  getSingleValueAsync: getSingleValueAsync,
  createSingleRowAsync: createSingleRowAsync
};
exports.default = _default;