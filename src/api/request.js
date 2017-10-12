// 统一管理请求接口
import config from '../../config';
const proxyTable = config.dev.proxyTable;

export default {
    search: '/searchtip',
    play: '/play',
    songsearch: '/songsearch'
}