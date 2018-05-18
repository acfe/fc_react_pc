const path = require('path');

//dev 后台接口地址 后台接口代理到本机
const apiHost = '10.204.49.210:8080';

//dev 本地调试虚拟服务器端口
const port = '3333';

//环境配置参数
const envPath = {
		test: {
			outputPath: 'test',
			publicPath: '/',
            apiHost: ''
		},
		online: {
			outputPath: 'online',
			publicPath: '/',
            apiHost: ''
		},
		local: {
			outputPath: 'local',
			publicPath: '/',
            apiHost: ''
		}
	};

//入口配置
const pages = {
    index: 'index',
    demo: 'demo'
};
const entry = {};
for (let p in pages) {
    entry[p] = path.join(__dirname, '../../src/pages/' + pages[p] + '/index.js');
}

//后台代理目录配置 后台接口地址的第一级目录列表
const proxyFolds = [
    '/user/*'
];
const proxyConfig = {
    target: 'http://' + apiHost,
    host: apiHost,
    secure: false,
    changeOrigin: true
};
const proxy = {};
for(let i = 0; i < proxyFolds.length; i++) {
    proxy[proxyFolds[i]] = proxyConfig;
}

//导出配置
exports.config =  {
    pages,
    envPath,
    entry,
    apiHost,
    port,
    proxy
};