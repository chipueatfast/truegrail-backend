'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "ownerAddress" to table "sneakers"
 *
 **/

var info = {
    "revision": 35,
    "name": "owner-address",
    "created": "2019-04-15T06:42:27.196Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "sneakers",
        "ownerAddress",
        {
            "type": Sequelize.STRING,
            "field": "ownerAddress"
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
