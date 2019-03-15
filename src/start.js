require("@babel/polyfill");

require('@babel/register')({
    presets: ['@babel/preset-env'],
});

require('dotenv').load();

module.exports = require('./app');
