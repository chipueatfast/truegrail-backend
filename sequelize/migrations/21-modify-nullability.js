'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "sneakerId" on table "transactions"
 * changeColumn "sneakerId" on table "transactions"
 * changeColumn "sellerId" on table "transactions"
 * changeColumn "sellerId" on table "transactions"
 *
 **/

var info = {
    "revision": 21,
    "name": "modify-nullability",
    "created": "2019-02-25T08:05:26.966Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "transactions",
            "sneakerId",
            {
                "type": Sequelize.INTEGER,
                "field": "sneakerId",
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "sneakers",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "transactions",
            "sneakerId",
            {
                "type": Sequelize.INTEGER,
                "field": "sneakerId",
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "sneakers",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "transactions",
            "sellerId",
            {
                "type": Sequelize.INTEGER,
                "field": "sellerId",
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "transactions",
            "sellerId",
            {
                "type": Sequelize.INTEGER,
                "field": "sellerId",
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": false
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
