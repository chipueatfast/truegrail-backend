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
      passwordSalt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
