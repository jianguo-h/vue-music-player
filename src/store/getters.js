export default {
    listTotal: state => state.songList.length,
    curPlayFileName: state => state.songList[state.curPlayIndex].FileName,
    curPlaySongName: state => state.songList[state.curPlayIndex].SongName,
    curPlaySingerName: state => state.songList[state.curPlayIndex].SingerName
}