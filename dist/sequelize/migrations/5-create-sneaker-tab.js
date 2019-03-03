'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "sneakers", deps: []
 *
 **/

var info = {
    "revision": 5,
    "name": "create-sneaker-tab",
    "created": "2019-02-24T12:19:28.933Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: ["sneakers", {
        "id": {
            "type": Sequelize.INTEGER,
            "field": "id",
            "autoIncrement": true,
            "primaryKey": true,
            "allowNull": false
        },
        "brand": {
            "type": Sequelize.STRING,
            "field": "brand"
        },
        "model": {
            "type": Sequelize.STRING,
            "field": "model"
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
    up: function (queryInterface, Sequelize) {
        var index = this.pos;
        return new Promise(function (resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    let command = migrationCommands[index];
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