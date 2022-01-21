import webpack from 'webpack';
import webpackDevConfig from './webpack.dev.config';
import WebpackDevServer from 'webpack-dev-server';
import detectPort from 'detect-port';
import { serverPort } from '../config';

const options: WebpackDevServer.Configuration = {
  historyApiFallback: true,
  open: true,
  hot: true,
  liveReload: true,
  client: {
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  proxy: {
    '/api': {
      target: 'http://localhost:' + serverPort,
      changeOrigin: true,
    },
  },
};

const compiler = webpack(webpackDevConfig);
let port = 8080;

async function startDevServer() {
  const _port = await detectPort(port);
  if (_port === port) {
    options.port = port;
    const server = new WebpackDevServer(options, compiler);
    await server.start();
    return;
  }
  port += 1;
  await startDevServer();
}

startDevServer();
