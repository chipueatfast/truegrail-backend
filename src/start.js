require('babel-register')({
    presets: ['env'],
});

require('dotenv').load();

module.exports = require('./app');
