'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "sneakerId" from table "transactions"
 * removeColumn "sellerId" from table "transactions"
 *
 **/

var info = {
    "revision": 22,
    "name": "modify-nullability",
    "created": "2019-02-25T08:07:28.677Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["transactions", "sneakerId"]
    },
    {
        fn: "removeColumn",
        params: ["transactions", "sellerId"]
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
