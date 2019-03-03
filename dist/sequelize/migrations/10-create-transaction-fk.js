'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "transactionId" from table "sneakers"
 *
 **/

var info = {
    "revision": 10,
    "name": "create-transaction-fk",
    "created": "2019-02-24T12:47:40.018Z",
    "comment": ""
};

var migrationCommands = [];

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