// 统一管理各个请求
import axios from 'axios';
import request from './request';

export default {
    // 根据关键字搜索
    search(keyword) {
        const postData = {
            keyword
        };
        console.log(">>> [api.postData] 根据关键字搜索", postData);
        return axios.post(request.search, postData); 
    }
}