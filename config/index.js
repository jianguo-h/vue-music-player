module.exports = {
  dev: {
    port: 8080,
    env: "development",
    publicPath: "/",
    proxyTable: {
      // 搜索接口
      "/songsearch": {
        target: "http://songsearch.kugou.com/song_search_v2",
        changeOrigin: true,
        pathRewrite: {
          "^/songsearch": ""
        }
      },
      // 获取歌曲接口
      "/play": {
        target: "http://www.kugou.com/yy/index.php",
        changeOrigin: true,
        pathRewrite: {
          "^/play": ""
        }
      },
      // 搜索框关键词搜索接口
      "/searchtip": {
        target: "http://searchtip.kugou.com/getSearchTip",
        changeOrigin: true,
        pathRewrite: {
          "^/searchtip": ""
        }
      }
    }
  },
  prod: {
    env: "production",
    publicPath: "./"
  }
}