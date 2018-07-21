module.exports = {
  dev: {
    port: 8080,
    env: "development",
    publicPath: "/"
  },
  prod: {
    env: "production",
    publicPath: "/",
    port: 8088
  },
  // node服务器接口代理
  proxyTable: {
    // 搜索接口
    "/songsearch": {
      target: "http://songsearch.kugou.com/song_search_v2",
      pathRewrite: {
        "^/songsearch": ""
      }
    },
    // 获取歌曲接口
    "/play": {
      target: "http://www.kugou.com/yy/index.php",
      pathRewrite: {
        "^/play": ""
      }
    },
    // 搜索框关键词搜索接口
    "/searchtip": {
      target: "http://searchtip.kugou.com/getSearchTip",
      pathRewrite: {
        "^/searchtip": ""
      }
    }
  }
}