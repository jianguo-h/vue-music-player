export default {
    view: "",                   // 当前播放歌曲所属的路由
    loading: false,             // loading状态
    songList: [],               // 歌曲列表数组
    searchCount: 0,             // 搜索结果歌曲的数量
    showDetail: false,          // 是否显示详情页
    audio: null,                // audio的dom节点
    audioSrc: null,             // audioSrc播放来源
    isPlayed: false,            // 是否有音乐在播放
    canPlayed: false,           // 是否可以播放音乐
    paused: false,              // 音频是否为暂停状态
    curPlayIndex: -1,           // 当前播放歌曲的索引
    curPlayImgSrc: "",          // 歌手图片来源, 默认值
    curPlayLrcArr: [],          // 歌词数组
    lock: false,                // 事件开关, 防止canplay事件多次执行
    loop: false,                // 歌曲是否循环播放
    modeType: 'order'           // 播放模式
}