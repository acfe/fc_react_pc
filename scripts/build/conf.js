const buildAction = require('../lib/build_action').buildAction;
const config = require('../config/config').config;
const envPath = config.envPath;

const arguments = process.argv.splice(2);
const pathKey = arguments[0] || 'local';

const file = 'scripts/templates/js/env.config.js';
const replaceArr = [
    {
        reg: 'envPath',
        value: JSON.stringify(envPath[pathKey])
    }
];

buildAction({
	file,
	out: 'scripts/config/env.config.js',
	replaceArr
});

buildAction({
	file,
	out: 'src/common/js/env.config.js',
	replaceArr
});