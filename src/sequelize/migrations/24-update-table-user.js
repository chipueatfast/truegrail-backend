'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "passwordSalt" to table "users"
 * addColumn "passwordHash" to table "users"
 *
 **/

var info = {
    "revision": 24,
    "name": "update-table-user",
    "created": "2019-03-03T11:49:29.663Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "users",
            "passwordSalt",
            {
                "type": Sequelize.STRING,
                "field": "passwordSalt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "passwordHash",
            {
                "type": Sequelize.STRING,
                "field": "passwordHash",
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
