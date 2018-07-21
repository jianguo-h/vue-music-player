import api from '../api';
import { Toast, Indicator } from 'mint-ui';

export default {
  playSong({ commit, getters }) {
    Indicator.open('加载中...');
    commit("setIsPlayed", false);
    commit("setAudioSrc", "");
    commit("setCurPlayLrcArr", []);
    commit("setCurPlayImgSrc", require("../../static/img/singer-default.jpg"));
    commit("setPaused");
    commit('setLock', false);
    commit('setCurLrcIndex', 0);

    const songName = getters.curPlayFileName;
    api.getSongInfo(songName).then(res => {
      console.log('>>> [res] 获取歌曲的hash值', res);
      if(res.status === 200 && res.statusText === 'OK') {
        const hash = res.data.data.lists[0].FileHash;
        play(hash);
      }
      else {
        Toast({
          message: '播放歌曲失败',
          duration: 3
        });
        console.log('>>> 获取歌曲的hash值失败');
      }
    }).catch(err => {
      Indicator.close();
      console.log('>>> [err] 获取歌曲的hash值', err);
      Toast('网络出现错误或服务暂时不可用');
    });

    const play = hash => {
      api.play(hash).then(res => {
        console.log('>>> [res] 获取歌曲的信息', res);
        if(res.status === 200 && res.statusText === 'OK') {
          const data = res.data.data;
          if(!data.play_url) {
            Toast({
              message: '暂无播放来源',
              duration: 3
            });
            Indicator.close('加载中...');
            return;
          }
          const audioSrc = data.play_url;
          const curPlayImgSrc = data.img;
          const lyrics = data.lyrics;

          Indicator.close();
          commit("setCanPlayed", true);
          commit("setAudioSrc", audioSrc);
          commit("setCurPlayLrcArr", lyrics);
          commit("setCurPlayImgSrc", curPlayImgSrc);
        }
        else {
          console.log('>>> 获取歌曲信息失败');
          Toast({
            message: '播放歌曲失败',
            duration: 3
          });
        }
      }).catch(err => {
        Indicator.close();
        console.log('>>> [err] 获取歌曲的信息', err);
        Toast('网络出现错误或服务暂时不可用');
      });
    }
  }
}