export interface IStoreState {
  view: string;
  songList: any[];
  searchCount: number;
  showDetail: boolean;
  audio: null | HTMLAudioElement;
  audioSrc: null | string;
  isPlayed: boolean;
  canPlayed: boolean;
  paused: boolean;
  curPlayIndex: number;
  curPlayImgSrc: string;
  curPlayLrcArr: any[];
  curLrcIndex: number;
  lock: boolean;
  loop: boolean;
  modeType: string;
  lrcSwitch: boolean;
  lrcColor: {
    defaultColor: string;
    activeColor: string;
  };
}

const state: IStoreState = {
  view: '', // 当前播放歌曲所属的路由
  songList: [], // 歌曲列表数组
  searchCount: 0, // 搜索结果歌曲的数量
  showDetail: false, // 是否显示详情页
  audio: null, // audio的dom节点
  audioSrc: null, // audioSrc播放来源
  isPlayed: false, // 是否有音乐在播放
  canPlayed: false, // 是否可以播放音乐
  paused: false, // 音频是否为暂停状态
  curPlayIndex: -1, // 当前播放歌曲的索引
  curPlayImgSrc: '', // 歌手图片来源, 默认值
  curPlayLrcArr: [], // 歌词数组
  lock: false, // 事件开关, 防止canplay事件多次执行
  loop: false, // 歌曲是否循环播放
  modeType: 'order', // 播放模式
  curLrcIndex: 0, // 当前播放歌曲所播放到的当前歌词行
  lrcSwitch: false, // 是否显示悬浮歌词
  lrcColor: {
    defaultColor: '#b2f5b5',
    activeColor: '#d1c90e'
  }
};

export default state;
