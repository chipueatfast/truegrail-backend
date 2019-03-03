'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "buyerId" on table "transactions"
 * changeColumn "buyerId" on table "transactions"
 *
 **/

var info = {
    "revision": 18,
    "name": "modify-nullability",
    "created": "2019-02-24T13:03:28.923Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: ["transactions", "buyerId", {
        "type": Sequelize.INTEGER,
        "field": "buyerId",
        "onUpdate": "CASCADE",
        "onDelete": "NO ACTION",
        "references": {
            "model": "users",
            "key": "id"
        },
        "allowNull": false
    }]
}, {
    fn: "changeColumn",
    params: ["transactions", "buyerId", {
        "type": Sequelize.INTEGER,
        "field": "buyerId",
        "onUpdate": "CASCADE",
        "onDelete": "NO ACTION",
        "references": {
            "model": "users",
            "key": "id"
        },
        "allowNull": false
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