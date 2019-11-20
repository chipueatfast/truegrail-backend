'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eosName: {
            type: DataTypes.STRING,
        },
        publicKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        encryptedPrivateKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isBlockchainSynced: {
            type: DataTypes.BOOLEAN,
        },
        // this is for the user with role factory only
        brand: DataTypes.STRING,
        refreshToken: DataTypes.STRING,
        registrationToken: DataTypes.STRING,
    }, {});

    User.prototype.serialize = function () {
        return {
            ...this.dataValues,
            passwordHash: undefined,
        }
    };
    return User;
};
