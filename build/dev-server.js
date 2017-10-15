const opn = require('opn');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const router = require('../router');
const webpackDevConfig = require('./webpack.dev.config');
const httpProxyMiddleware = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(webpackDevConfig);
const express = require('express');
const app = express();
const port = config.dev.port;
const url = 'http://localhost:' + port;
const proxyTable = config.dev.proxyTable;

// 当环境变量不存在时设置为开发环境
if(!process.env.NODE_ENV) {
	process.env.NODE_ENV = config.dev.env;
}

// 路由设置
router(express, app);

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
	stats: {
		colors: true
	}
});
const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler, {
	log: () => {}
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
	compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
		webpackHotMiddlewareInstance.publish({
			action: 'reload'
		});
		cb();
	})
});

// proxy api requests
Object.keys(proxyTable).forEach(ctx => {
	let options = proxyTable[ctx];
	if(typeof options === 'string') {
		options = { target: options }
	}
	app.use(httpProxyMiddleware(options.filter || ctx, options));
});

app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);

let _resolve;
const readyPromise = new Promise((resolve, reject) => {
	_resolve = resolve;
});

console.log('> Starting dev server...')
webpackDevMiddlewareInstance.waitUntilValid(() => {
	console.log('server start at ' + url);
	if(process.env.NODE_ENV === config.dev.env) {
		opn(url, {
			app: 'chrome'
		});
	}
	_resolve();
});

app.listen(port);