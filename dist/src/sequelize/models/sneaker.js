'use strict';

module.exports = function (sequelize, DataTypes) {
  var Sneaker = sequelize.define('sneaker', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: false,
      primaryKey: true,
      unique: true
    },
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    colorway: DataTypes.STRING,
    limitedEdition: DataTypes.BOOLEAN,
    releaseDate: DataTypes.DATEONLY,
    size: DataTypes.FLOAT,
    condition: DataTypes.ENUM('issued', 'sold', 'resold', 'stolen'),
    ownerAddress: DataTypes.STRING
  });

  Sneaker.associate = function (models) {
    Sneaker.belongsTo(models.user, {
      as: 'owner'
    });
  };

  return Sneaker;
};