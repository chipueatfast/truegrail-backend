'use strict';

module.exports = (sequelize, DataTypes) => {
    const Sneaker = sequelize.define('sneaker', {
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        status: DataTypes.ENUM('ds', 'vnds', 'stolen')
    });

    Sneaker.associate = models => {
        Sneaker.belongsTo(models.user, { as: 'owner' });
    };
    return Sneaker;
};