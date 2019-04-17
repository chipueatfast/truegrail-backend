'use strict';

var Sequelize = require('sequelize');
/**
 * Actions summary:
 *
 * createTable "contracts", deps: []
 *
 **/


var info = {
  "revision": 28,
  "name": "add-contract-table",
  "created": "2019-04-11T08:16:34.169Z",
  "comment": ""
};
var migrationCommands = [{
  fn: "createTable",
  params: ["contracts", {
    "id": {
      "type": Sequelize.INTEGER,
      "field": "id",
      "autoIncrement": true,
      "primaryKey": true,
      "allowNull": false
    },
    "name": {
      "type": Sequelize.STRING,
      "field": "name",
      "allowNull": false
    },
    "jsonContent": {
      "type": Sequelize.TEXT,
      "field": "jsonContent",
      "allowNull": false
    },
    "createdAt": {
      "type": Sequelize.DATE,
      "field": "createdAt",
      "allowNull": false
    },
    "updatedAt": {
      "type": Sequelize.DATE,
      "field": "updatedAt",
      "allowNull": false
    }
  }, {}]
}];
module.exports = {
  pos: 0,
  up: function up(queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          var command = migrationCommands[index];
          console.log("[#" + index + "] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  info: info
};