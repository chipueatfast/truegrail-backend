'use strict';

module.exports = (sequelize, DataTypes) => {
    const Sneaker = sequelize.define('sneaker', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: false,
            primaryKey: true,
            unique: true,
        },
        factoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        colorway: DataTypes.STRING,
        limitedEdition: DataTypes.BOOLEAN,
        releaseDate: DataTypes.DATEONLY,
        size: DataTypes.FLOAT,
    });

    Sneaker.associate = (models) => {
        Sneaker.belongsTo(models.user, {as: 'owner'});
    };
    return Sneaker;
};
