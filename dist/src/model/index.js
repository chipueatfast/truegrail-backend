'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Sequelize = require('sequelize');

var sequelize = new Sequelize('truegrail', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

exports.default = sequelize;