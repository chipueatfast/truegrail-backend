'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "transactionId" to table "sneakers"
 *
 **/

var info = {
    "revision": 11,
    "name": "create-transaction-fk",
    "created": "2019-02-24T12:48:59.807Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: ["sneakers", "transactionId", {
        "type": Sequelize.INTEGER,
        "field": "transactionId",
        "onUpdate": "CASCADE",
        "onDelete": "SET NULL",
        "references": {
            "model": "transactions",
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