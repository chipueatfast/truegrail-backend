'use strict'

module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define('contract', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jsonContent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        creator: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    })
    
    return Contract;
}