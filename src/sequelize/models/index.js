'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const User = require('./user');
const Sneaker =  require('./sneaker');

function initSequelize() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully');
        })
        .catch((err) => {
            console.log('Unable to connect to database: ', err);
        });
}

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

const mappingModels = (models, sequelize, Sequelize) => {
    models.map(
        (model) => {
            sequelize[model.name] = model.def(sequelize, Sequelize);
        }
    )
};

mappingModels([
    {
        name: 'User',
        def: User,
    },
    {
        name: 'Sneaker',
        def: Sneaker,
    },
], sequelize, Sequelize);


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.initSequelize = initSequelize;

module.exports = db;
