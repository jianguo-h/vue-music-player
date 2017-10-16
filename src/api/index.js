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
    },
    // 获取歌曲的hash值
    getSongHash(songName) {
        const requestData = {
            page: 1,
            pagesize: 30,
            keyword: songName,
            platform: "WebFilter",
            userid: -1,
            iscorrection: 1,
            privilege_filter: 0,
            filter: 2
        };
        console.log('>>> [api.requestData] 获取歌曲的hash值', requestData);
        return axios.get(request.songsearch, {
            params: { ...requestData }
        });
    },
    // 根据hash值获取歌曲的信息
    getSongInfo(hash) {
        const requestData = {
            r: "play/getdata",
            hash
        };
        console.log('>>> [api.requestData] 根据hash值获取歌曲的信息', requestData);
        return axios.get(request.play, {
            params: { ...requestData }
        });
    }
}