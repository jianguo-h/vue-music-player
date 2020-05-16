const history = require('connect-history-api-fallback');

// config history mode
module.exports = app => {
  app.use(history());
};
