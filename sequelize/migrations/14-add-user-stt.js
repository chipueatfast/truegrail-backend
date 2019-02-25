'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "status" to table "sneakers"
 *
 **/

var info = {
    "revision": 14,
    "name": "add-user-stt",
    "created": "2019-02-24T12:54:53.600Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "sneakers",
        "status",
        {
            "type": Sequelize.ENUM('ds', 'vnds', 'stolen'),
            "field": "status"
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
