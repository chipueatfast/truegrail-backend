'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "status" from table "sneakers"
 * addColumn "condition" to table "sneakers"
 * addColumn "size" to table "sneakers"
 * addColumn "releaseDate" to table "sneakers"
 * addColumn "limitedEdtion" to table "sneakers"
 * addColumn "colorway" to table "sneakers"
 *
 **/

var info = {
    "revision": 30,
    "name": "sneaker-table",
    "created": "2019-04-14T09:05:40.632Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["sneakers", "status"]
    },
    {
        fn: "addColumn",
        params: [
            "sneakers",
            "condition",
            {
                "type": Sequelize.ENUM('ds', 'vnds', 'used', 'stolen'),
                "field": "condition"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "sneakers",
            "size",
            {
                "type": Sequelize.FLOAT,
                "field": "size"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "sneakers",
            "releaseDate",
            {
                "type": Sequelize.DATEONLY,
                "field": "releaseDate"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "sneakers",
            "limitedEdtion",
            {
                "type": Sequelize.BOOLEAN,
                "field": "limitedEdtion"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "sneakers",
            "colorway",
            {
                "type": Sequelize.STRING,
                "field": "colorway"
            }
        ]
    }
];

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
