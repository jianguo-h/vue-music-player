const songData = require('../static/data/song.json');

// 配置express的路由
module.exports = function(app) {
  const routes = ['new', 'recommend', 'local'];
  for(const route of routes) {
    app.post('/api/' + route, (req, res) => {
      res.json({
        path: route,
        data: songData[route]
      });
    });
  }
}