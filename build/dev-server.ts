import webpack from 'webpack';
import webpackDevConfig from './webpack.dev.config';
import WebpackDevServer from 'webpack-dev-server';
import detectPort from 'detect-port';
import { serverPort } from '../config';

const options: WebpackDevServer.Configuration = {
  hot: true,
  historyApiFallback: true,
  open: true,
  liveReload: true,
  stats: {
    errors: true,
    errorDetails: true,
    errorStack: true,
    warnings: true,
    colors: true,
    assets: false,
    chunks: false,
    modules: false,
  },
  overlay: {
    warnings: false,
    errors: true,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:' + serverPort,
      changeOrigin: true,
    },
  },
};

WebpackDevServer.addDevServerEntrypoints(webpackDevConfig, options);

const compiler = webpack(webpackDevConfig);
const server = new WebpackDevServer(compiler, options);

let port = 8080;

async function startDevServer() {
  const _port = await detectPort(port);
  if (_port === port) {
    server.listen(port);
    return;
  }
  port += 1;
  await startDevServer();
}

startDevServer();
