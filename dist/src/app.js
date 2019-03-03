'use strict';

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();
var port = 2190;

app.get('/', function (req, res) {
    res.send('Hello world again');
});

_model2.default.authenticate().then(function () {
    console.log('Connection has been established successfully');
}).catch(function (err) {
    console.log('Unable to connect to database: ', err);
});

app.listen(port, function () {
    return console.log('Server running at port ' + port);
});