require('@babel/polyfill');
require('@babel/register')({
    presets: [
        [
            '@babel/preset-env',
            {
                "exclude": ["transform-classes"],
            },
        ],
    ],
});

require('dotenv').load();

module.exports = require('.');
