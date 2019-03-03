'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "ownerId" to table "sneakers"
 *
 **/

var info = {
    "revision": 6,
    "name": "add-owner",
    "created": "2019-02-24T12:24:21.832Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: ["sneakers", "ownerId", {
        "type": Sequelize.INTEGER,
        "field": "ownerId",
        "onUpdate": "CASCADE",
        "onDelete": "SET NULL",
        "references": {
            "model": "users",
            "key": "id"
        },
        "allowNull": true
    }]
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