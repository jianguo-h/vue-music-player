import open from 'open';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import { devPort, serverPort } from '../config';
import proxy from '../express/proxy';
import historyMode from '../express/history-mode';
import webpackDevConfig from './webpack.dev.config';
import detectionPort from '../express/detection-port';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();
const compiler = webpack(webpackDevConfig);
const url = 'http://localhost:' + devPort;

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output?.publicPath ?? '/',
  stats: { colors: true },
});
const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler);

// force page reload when html-webpack-plugin template changes
/* compiler.hooks.compilation.tap('HtmlWebpackPlugin', compilation => {
  compilation.hooks.htmlWebpackPluginAfterEmit.tap('HtmlWebpackPlugin', () => {
    webpackHotMiddlewareInstance.publish({
      action: 'reload',
    });
  });
}); */
/* compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    webpackHotMiddlewareInstance.publish({
      action: 'reload'
    });
    cb();
  });
}); */

// config history mode
historyMode(app);

// config proxy
const extraProxys = {
  '/api': {
    target: 'http://localhost:' + serverPort,
    changeOrigin: true,
  },
};
proxy(app, extraProxys);

// use middleWare
app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);

// static path config
const staticPath = path.resolve(__dirname, '../static');
app.use('/static', express.static(staticPath));

webpackDevMiddlewareInstance.waitUntilValid(async () => {
  console.log('server start at ' + url);
  await open(url);
});

// 端口检测
detectionPort(app, devPort);
