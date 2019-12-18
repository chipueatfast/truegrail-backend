'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        userIdentity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
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
        fcmToken: DataTypes.STRING,
        customerId: DataTypes.INTEGER,
        gender: DataTypes.ENUM('MALE', 'FEMALE'),
        dob: DataTypes.DATE,
    }, {});

    User.prototype.serialize = function () {
        return {
            ...this.dataValues,
            passwordHash: undefined,
        }
    };
    return User;
};
