export default {
  setView(state, view) {
    state.view = view;
  },
  setSongList(state, songList) {
    state.songList = songList;
  },
  setSearchCount(state, searchCount) {
    state.searchCount = searchCount;
  },
  setShowDetail(state, showDetail) {
    state.showDetail = showDetail;
  },
  setAudio(state, audio) {
    state.audio = audio;
  },
  setAudioSrc(state, audioSrc) {
    state.audioSrc = audioSrc;
  },
  setIsPlayed(state, isPlayed) {
    state.isPlayed = isPlayed;
  },
  setCanPlayed(state, canPlayed) {
    state.canPlayed = canPlayed;
  },
  setPaused(state) {
    if(!state.audioSrc) {
      state.paused = false;
      return;
    }
    state.paused = !state.paused;
    if(state.paused) {
      state.audio.pause();
    }
    else {
      state.audio.play();
    }
  },
  setCurPlayIndex(state, curPlayIndex) {
    const listTotal = state.songList.length;
    if(curPlayIndex < 0) {
      curPlayIndex = listTotal - 1;
    }
    else if(curPlayIndex >= listTotal) {
      curPlayIndex = 0;
    }
    state.curPlayIndex = curPlayIndex;
  },
  setCurPlayImgSrc(state, curPlayImgSrc) {
    state.curPlayImgSrc = curPlayImgSrc;
  },
  setCurPlayLrcArr(state, lyrics) {
    if(lyrics.length === 0) {
      return;
    }
    const lrc = lyrics.replace(/\n/g, "").split("[").slice(1);
    const curPlayLrcArr = [];
    for(const [index, item] of lrc.entries()) {
      const times = item.split("]")[0].replace(".", ":").split(":");
      const time = Number(times[0]) * 60 + Number(times[1]) + Number(times[2]) / 1000;
      const obj = {
        index,
        startTime: time.toFixed(2),
        curLrc: item.split("]")[1]
      }
      curPlayLrcArr.push(obj);
    }
    state.curPlayLrcArr = curPlayLrcArr;
  },
  setLock(state, lock) {
    state.lock = lock;
  },
  setLoop(state, loop) {
    state.loop = loop;
  },
  setModeType(state, modeType) {
    state.modeType = modeType;
  },
  setCurLrcIndex(state, curLrcIndex) {
    state.curLrcIndex = curLrcIndex;
  },
  setLrcColor(state, lrcColor) {
    state.lrcColor = lrcColor;
  },
  setLrcSwitch(state, lrcSwitch) {
    state.lrcSwitch = lrcSwitch;
    window.localStorage.lrcSwitch = lrcSwitch;
  }
}