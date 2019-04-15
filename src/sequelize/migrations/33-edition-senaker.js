'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "id" on table "sneakers"
 *
 **/

var info = {
    "revision": 33,
    "name": "edition-senaker",
    "created": "2019-04-15T05:08:46.543Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "sneakers",
        "id",
        {
            "type": Sequelize.BIGINT,
            "field": "id",
            "unique": true,
            "primaryKey": true,
            "autoIncrement": false
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
