// 配置express的路由
module.exports = function(express, app, songData) {
    const router = express.Router();
    const routes  = ['new', 'recommend', 'local'];
    for(const route of routes) {
        router.post('/' + route, (req, res) => {
            res.json({
                path: route,
                data: songData[route]
            });
        });
    }
    app.use('/api', router);
}