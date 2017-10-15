// 配置express的路由
module.exports = function(express, app) {
    const router = express.Router();
    const routes  = ['new', 'recommend', 'local'];
    const json = require('../static/data/song.json');
    for(const route of routes) {
        router.post('/' + route, (req, res) => {
            res.json({
                path: route,
                data: json[route]
            });
        });
    }
    app.use('/api', router);
}