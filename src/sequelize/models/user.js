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
        refreshToken: DataTypes.STRING,
        registrationToken: DataTypes.STRING,
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
