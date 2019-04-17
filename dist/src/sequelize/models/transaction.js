'use strict';

module.exports = function (sequelize, DataTypes) {
  var Transaction = sequelize.define('transaction', {
    txHash: DataTypes.STRING
  });

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.user, {
      as: 'buyer',
      foreignKey: {
        allowNull: false
      }
    });
    Transaction.belongsTo(models.user, {
      as: 'seller',
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Transaction;
};