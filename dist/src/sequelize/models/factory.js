'use strict';

module.exports = function (sequelize, DataTypes) {
  var Factory = sequelize.define('factory', {
    blockchainAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    physicalAddress: {
      type: DataTypes.STRING
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Factory;
};