const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../config');
const proxy = require('../express/proxy');
const webpackDevConfig = require('./webpack.dev.config');
const detectionPort = require('../express/detection-port');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const compiler = webpack(webpackDevConfig);
const devPort = config.dev.port;
const url = 'http://localhost:' + devPort;

// 当环境变量不存在时设置为开发环境
if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env;
}

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  stats: {
    colors: true
  }
});
const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler, {
  log: () => { }
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

// config proxy
const extraProxys = {
  '/api': {
    target: 'http://localhost:' + config.prod.port,
    changeOrigin: true
  }
};
proxy(app, extraProxys);

// use middleWare
app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);

// static path config
const staticPath = path.resolve(__dirname, '../static');
app.use('/static', express.static(staticPath));

let _resolve;
new Promise(resolve => {
  _resolve = resolve;
});

console.log('> Starting dev server...');
webpackDevMiddlewareInstance.waitUntilValid(() => {
  console.log('server start at ' + url);
  if(process.env.NODE_ENV === config.dev.env) {
    opn(url);
  }
  _resolve();
});

// 端口检测
detectionPort(app, devPort);