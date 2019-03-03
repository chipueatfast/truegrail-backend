'use strict';

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('transaction', {
        txHash: DataTypes.STRING,
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(
            models.user,
            {
                as: 'buyer',
                foreignKey: { allowNull: false },
            });
        Transaction.belongsTo(
            models.user,
            {
                as: 'seller',
                foreignKey: {
                    allowNull: false,
                }
            });
        Transaction.belongsTo(
            models.sneaker,
            {
                foreignKey: {
                    allowNull: false,
                }
            }
        );
    };

    return Transaction;
};
