'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "factories", deps: []
 *
 **/

var info = {
    "revision": 27,
    "name": "add-factory-table",
    "created": "2019-04-07T04:35:53.508Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "factories",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "blockchainAddress": {
                "type": Sequelize.STRING,
                "field": "blockchainAddress",
                "allowNull": false
            },
            "brand": {
                "type": Sequelize.STRING,
                "field": "brand",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
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
