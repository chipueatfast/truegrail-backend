'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "physicalAddress" to table "factories"
 *
 **/

var info = {
    "revision": 36,
    "name": "add-physical-address",
    "created": "2019-04-15T06:58:34.724Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "factories",
        "physicalAddress",
        {
            "type": Sequelize.STRING,
            "field": "physicalAddress"
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
