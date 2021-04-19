import express from 'express';
import song from './song.json';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { proxyTable, serverPort } from '../config';
import path from 'path';

const app = express();

// config express router
const songData = JSON.parse(JSON.stringify(song));
const routes = ['new', 'recommend', 'local'];
for (const route of routes) {
  app.get('/api/' + route, (_, res) => {
    res.json({
      path: route,
      data: songData[route],
    });
  });
}

// config exress server proxy
const isDev = process.env.NODE_ENV === 'development';
Object.keys(proxyTable).forEach(ctx => {
  let options = proxyTable[ctx];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(
    ctx,
    createProxyMiddleware({
      changeOrigin: true,
      target: isDev ? 'http://localhost:' + serverPort : options.target,
      pathRewrite: isDev ? undefined : options.pathRewrite,
    })
  );
});

// static path config
const distPath = path.join(__dirname, '../dist');
app.use('/', express.static(distPath));

app.listen(serverPort, () => {
  console.log(
    '\n express backend server start at http://localhost:' + serverPort
  );
});
