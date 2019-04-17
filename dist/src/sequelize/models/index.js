'use strict';

var fs = require('fs');

var path = require('path');

var Sequelize = require('sequelize');

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../config/config.json')[env];

var db = {};

var User = require('./user');

var Factory = require('./factory');

var Contract = require('./contract');

var Sneaker = require('./sneaker');

var sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

var mappingModels = function mappingModels(models, sequelize, Sequelize) {
  models.map(function (model) {
    sequelize[model.name] = model.def(sequelize, Sequelize);
  });
};

mappingModels([{
  name: 'User',
  def: User
}, {
  name: 'Factory',
  def: Factory
}, {
  name: 'Contract',
  def: Contract
}, {
  name: 'Sneaker',
  def: Sneaker
}], sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;