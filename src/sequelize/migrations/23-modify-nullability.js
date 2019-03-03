'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "sneakerId" to table "transactions"
 * addColumn "sellerId" to table "transactions"
 *
 **/

var info = {
    "revision": 23,
    "name": "modify-nullability",
    "created": "2019-02-25T08:07:42.218Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
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
        fn: "addColumn",
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
