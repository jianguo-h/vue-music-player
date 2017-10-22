export default {
    listTotal: state => state.songList.length,
    curPlayFileName: state => {
        if(state.curPlayIndex < 0) {
            return '';
        }
        return state.songList[state.curPlayIndex].FileName;
    },
    curPlaySongName: state => {
        if(state.curPlayIndex < 0) {
            return '';
        }
        return state.songList[state.curPlayIndex].SongName;
    },
    curPlaySingerName: state => {
        if(state.curPlayIndex < 0) {
            return '';
        }
        return state.songList[state.curPlayIndex].SingerName;
    }
}