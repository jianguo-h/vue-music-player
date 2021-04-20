import { GetterTree } from 'vuex';
import { IStoreState } from './state';

const getters: GetterTree<IStoreState, IStoreState> = {
  listTotal: (state): number => state.songList.length,
  curPlayFileName: state => {
    if (state.curPlayIndex < 0) {
      return '';
    }
    return state.songList?.[state.curPlayIndex]?.FileName;
  },
  curPlaySongName: state => {
    if (state.curPlayIndex < 0) {
      return '';
    }
    return state.songList?.[state.curPlayIndex]?.SongName;
  },
  curPlaySingerName: state => {
    if (state.curPlayIndex < 0) {
      return '';
    }
    return state.songList?.[state.curPlayIndex]?.SingerName;
  },
};

export default getters;
