// 统一管理各个请求
import axios from 'axios';
import request from './request';

export default {
    // 根据关键字搜索
    search(keyword) {
        return new Promise((resolve, reject) => {
            const params = {
                keyword
            };
            console.log(">>> [api.params] 根据关键字搜索", params);
            axios.post(request.search, params).then(res => {
                resolve(res);
            }).catch(reject);
        });
    },
    // 获取静态json数据中的歌曲列表
    getList(path) {
        return new Promise((resolve, reject) => {
            console.log('>>> [api.params] 获取静态json数据中的歌曲列表', path);
            axios.post(request[path]).then(res => {
                resolve(res);
            }).catch(reject);
        });
    },
    // 获取歌曲的一些信息
    getSongInfo(songName, page = 1) {
        return new Promise((resolve, reject) => {
            const params = {
                page,
                pagesize: 20,
                keyword: songName,
                platform: "WebFilter",
                userid: -1,
                iscorrection: 1,
                privilege_filter: 0,
                filter: 2
            };
            console.log('>>> [api.params] 获取歌曲的一些信息', params);
            axios.get(request.songsearch, { params }).then(res => {
                resolve(res);
            }).catch(reject);
        });
    },
    // 根据hash值获取歌曲的信息
    play(hash) {
        return new Promise((resolve, reject) => {
            const params = {
                r: "play/getdata",
                hash
            };
            console.log('>>> [api.params] 根据hash值获取歌曲的信息', params);
            axios.get(request.play, { params }).then(res => {
                resolve(res);
            }).catch(reject);
        });
    }
}