import api from '../api';

export default {
    playSong({ commit, getters }) {
        commit("setLoading", true);
        commit("setIsPlayed", false);
        commit("setAudioSrc", "");
        commit("setCurPlayLrcArr", []);
        commit("setCurPlayImgSrc", "../../static/singer-default.jpg");
        commit("setPaused");

        const songName = getters.curPlayFileName;
        api.getSongHash(songName).then(res => {
            console.log('>>> [res] 获取歌曲的hash值', res);
            if(res.status === 200 && res.statusText === 'OK') {
                const hash = res.data.data.lists[0].FileHash;
                play(hash);
            }
            else {
                console.log('>>> 获取歌曲的hash值失败');
            }
        }).catch(err => {
            console.log('>>> [err] 获取歌曲的hash值', err);
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
                }
            }).catch(err => {
                console.log('>>> [err] 获取歌曲的信息', err);
            });
        }
        // getFilehash();

        // 加载歌曲的一些信息，求得歌曲的hash值
        function getFilehash() {
            commit("setLoading", true);
            commit("setIsPlayed", false);
            commit("setAudioSrc", "");
            commit("setCurPlayLrcArr", []);
            commit("setCurPlayImgSrc", "../../static/singer-default.jpg");
            commit("setPaused");
            axios.get("/songsearch", {
                params: {
                    page: 1,
                    pagesize: 30,
                    keyword: getters.curPlayFileName,
                    platform: "WebFilter",
                    userid: -1,
                    iscorrection: 1,
                    privilege_filter: 0,
                    filter: 2
                }
            }).then(res => {
                console.log('>>> res', res);
                let curPlayFileHash = JSON.parse(res.body).data.lists[0].FileHash;
                autoPlay(curPlayFileHash);
            }).catch(err => {
                alert("播放歌曲失败，请换一首歌播放！");
            });
        }

        // 根据歌曲的hash值获得歌手图片，播放地址，歌词等信息
        function autoPlay(curPlayFileHash) {
            axios.get("/play", {
                params: {
                    r: "play/getdata",
                    hash: curPlayFileHash
                }
            }).then(res => {
                let data = res.body.data;
                if(!data.play_url || data.play_url === "") {
                    alert("暂无播放来源！");
                    commit("setLoading", false);
                    return;
                }
                let audioSrc = data.play_url;
                let curPlayImgSrc = data.img;
                let lyrics = data.lyrics;

                commit("setLoading", false);
                commit("setCanPlayed", true);
                commit("setAudioSrc", audioSrc);
                commit("setCurPlayLrcArr", lyrics);
                commit("setCurPlayImgSrc", curPlayImgSrc);
            }).catch(err => {
                alert("暂无播放来源！");
            });
        }
    }
}