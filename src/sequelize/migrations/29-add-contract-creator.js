'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "creator" to table "contracts"
 *
 **/

var info = {
    "revision": 29,
    "name": "add-contract-creator",
    "created": "2019-04-13T02:47:52.059Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "contracts",
        "creator",
        {
            "type": Sequelize.STRING,
            "field": "creator",
            "allowNull": false
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
