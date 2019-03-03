'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "buyerId" from table "transactions"
 *
 **/

var info = {
    "revision": 19,
    "name": "modify-nullability",
    "created": "2019-02-24T13:03:47.173Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["transactions", "buyerId"]
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