const buildAction = require('../lib/build_action').buildAction;
const envPath = require('../config/env.config').envPath;

buildAction({
    file: 'scripts/templates/html/index.html',
    out: 'scripts/templates/www/index.html',
    replaceArr: [
        {
            reg: 'publicPath',
            value: envPath.publicPath
        },
        {
            reg: 'pageName',
            value: 'index'
        }
    ]
});

buildAction({
    file: 'scripts/templates/js/show_index.js',
    out: 'scripts/templates/www/show_index.js',
    replaceArr: [
        {
            reg: 'publicPath',
            value: envPath.publicPath
        },
        {
            reg: 'random',
            value: Math.random()
        }
    ]
});