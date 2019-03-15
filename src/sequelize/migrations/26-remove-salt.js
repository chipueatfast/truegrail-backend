'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "passwordSalt" from table "users"
 *
 **/

var info = {
    "revision": 26,
    "name": "remove-salt",
    "created": "2019-03-13T07:34:08.919Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["users", "passwordSalt"]
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
