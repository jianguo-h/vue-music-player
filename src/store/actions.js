import api from '../api';
import { Message } from 'element-ui';

export default {
    playSong({ commit, getters }) {
        commit("setLoading", true);
        commit("setIsPlayed", false);
        commit("setAudioSrc", "");
        commit("setCurPlayLrcArr", []);
        commit("setCurPlayImgSrc", "../../static/img/singer-default.jpg");
        commit("setPaused");

        const songName = getters.curPlayFileName;
        api.getSongHash(songName).then(res => {
            console.log('>>> [res] 获取歌曲的hash值', res);
            if(res.status === 200 && res.statusText === 'OK') {
                const hash = res.data.data.lists[0].FileHash;
                play(hash);
            }
            else {
                Message.error({
                    message: '播放歌曲失败',
                    duration: 3
                });
                console.log('>>> 获取歌曲的hash值失败');
            }
        }).catch(err => {
            console.log('>>> [err] 获取歌曲的hash值', err);
            Message.error('网络出现错误或服务暂时不可用');
        });

        const play = hash => {
            api.getSongInfo(hash).then(res => {
                console.log('>>> [res] 获取歌曲的信息', res);
                if(res.status === 200 && res.statusText === 'OK') {
                    const data = res.data.data;
                    if(!data.play_url || data.play_url === "") {
                        alert("暂无播放来源！");
                        commit("setLoading", false);
                        return;
                    }
                    const audioSrc = data.play_url;
                    const curPlayImgSrc = data.img;
                    const lyrics = data.lyrics;
    
                    commit("setLoading", false);
                    commit("setCanPlayed", true);
                    commit("setAudioSrc", audioSrc);
                    commit("setCurPlayLrcArr", lyrics);
                    commit("setCurPlayImgSrc", curPlayImgSrc);
                }
                else {
                    console.log('>>> 获取歌曲信息失败');
                    Message.error({
                        message: '播放歌曲失败',
                        duration: 3
                    });
                }
            }).catch(err => {
                console.log('>>> [err] 获取歌曲的信息', err);
                Message.error('网络出现错误或服务暂时不可用');
            });
        }
    }
}