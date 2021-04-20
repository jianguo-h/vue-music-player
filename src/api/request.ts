// 统一管理请求接口

const request: {
  [path: string]: string;
} = {
  new: '/api/new',
  recommend: '/api/recommend',
  local: '/api/local',
  search: '/searchtip',
  play: '/play',
  songsearch: '/songsearch',
};

export default request;
