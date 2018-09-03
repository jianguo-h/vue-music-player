const history = require('connect-history-api-fallback');

// config history mode
// 参考：https://github.com/bripkens/connect-history-api-fallback
module.exports = app => {
  app.use(history());
}