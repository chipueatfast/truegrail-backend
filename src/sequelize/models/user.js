'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: DataTypes.STRING,
      networkAddress: DataTypes.STRING,
  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.serialize = function () {
      return {
          ...this.dataValues,
          passwordHash: undefined,
      }
  };
  return User;
};
