// 统一管理各个请求
import axios from 'axios';
import request from './request';

export default {
    // 根据关键字搜索
    search(keyword) {
        const requestData = {
            keyword
        };
        console.log(">>> [api.requestData] 根据关键字搜索", requestData);
        return axios.post(request.search, requestData); 
    },
    // 获取静态json数据中的歌曲列表
    getList(path) {
        console.log('>>> [api.requestData] 获取静态json数据中的歌曲列表', path);
        return axios.post(request[path]);
    }
}