'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "ownerId" from table "sneakers"
 * changeColumn "id" on table "sneakers"
 * changeColumn "id" on table "sneakers"
 *
 **/

var info = {
    "revision": 31,
    "name": "actively-manage-scneaker-id",
    "created": "2019-04-15T04:45:04.041Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["sneakers", "ownerId"]
    },
    {
        fn: "changeColumn",
        params: [
            "sneakers",
            "id",
            {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "sneakers",
            "id",
            {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": false
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
