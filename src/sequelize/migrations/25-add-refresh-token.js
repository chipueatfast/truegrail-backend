'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "refreshToken" to table "users"
 *
 **/

var info = {
    "revision": 25,
    "name": "add-refresh-token",
    "created": "2019-03-10T08:58:15.617Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "refreshToken",
        {
            "type": Sequelize.STRING,
            "field": "refreshToken"
        }
    ]
}];

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
