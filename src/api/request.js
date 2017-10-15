// 统一管理请求接口
import config from '../../config';
const proxyTable = config.dev.proxyTable;

export default {
    new: '/api/new',
    recommend: '/api/recommend',
    local: '/api/local',
    search: '/searchtip',
    play: '/play',
    songsearch: '/songsearch'
}