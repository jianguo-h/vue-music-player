const { serverPort, proxyTable: configProxyTable } = require('../config');
const { createProxyMiddleware } = require('http-proxy-middleware');

let proxyTable = configProxyTable;
const isDev = process.env.NODE_ENV === 'development';

module.exports = function (app, extraProxys = null) {
  if (extraProxys && extraProxys.constructor === Object) {
    proxyTable = {
      ...proxyTable,
      ...extraProxys,
    };
  }

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
        pathRewrite: isDev ? null : options.pathRewrite,
      })
    );
  });
};
