'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "email" to table "Users"
 *
 **/

var info = {
    "revision": 3,
    "name": "add-email",
    "created": "2019-02-24T11:47:34.510Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: ["Users", "email", {
        "type": Sequelize.STRING,
        "field": "email"
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