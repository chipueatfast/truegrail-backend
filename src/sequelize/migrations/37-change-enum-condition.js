'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "condition" on table "sneakers"
 *
 **/

var info = {
    "revision": 37,
    "name": "change-enum-condition",
    "created": "2019-04-15T07:02:43.902Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "sneakers",
        "condition",
        {
            "type": Sequelize.ENUM('issued', 'sold', 'resold', 'stolen'),
            "field": "condition"
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
