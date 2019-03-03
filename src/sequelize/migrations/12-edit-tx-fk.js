'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "transactionId" from table "sneakers"
 * removeColumn "sellerId" from table "users"
 * removeColumn "buyerId" from table "users"
 * addColumn "sneakerId" to table "transactions"
 * addColumn "sellerId" to table "transactions"
 * addColumn "buyerId" to table "transactions"
 *
 **/

var info = {
    "revision": 12,
    "name": "edit-tx-fk",
    "created": "2019-02-24T12:50:49.176Z",
    "comment": ""
};

var migrationCommands = [
    {
        fn: "addColumn",
        params: [
            "transactions",
            "sneakerId",
            {
                "type": Sequelize.INTEGER,
                "field": "sneakerId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "sneakers",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "transactions",
            "sellerId",
            {
                "type": Sequelize.INTEGER,
                "field": "sellerId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "transactions",
            "buyerId",
            {
                "type": Sequelize.INTEGER,
                "field": "buyerId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
