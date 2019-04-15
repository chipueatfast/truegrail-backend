'use strict'

module.exports = (sequelize, DataTypes) => {
    const Factory = sequelize.define('factory', {
        blockchainAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        physicalAddress: {
            type: DataTypes.STRING,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Factory;
}