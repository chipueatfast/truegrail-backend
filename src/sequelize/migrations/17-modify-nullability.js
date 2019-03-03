'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "buyerId" to table "transactions"
 *
 **/

var info = {
    "revision": 17,
    "name": "modify-nullability",
    "created": "2019-02-24T13:02:28.769Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "transactions",
        "buyerId",
        {
            "type": Sequelize.INTEGER,
            "field": "buyerId",
            "onUpdate": "CASCADE",
            "onDelete": "SET NULL",
            "references": {
                "model": "users",
                "key": "id"
            },
            "allowNull": true
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
