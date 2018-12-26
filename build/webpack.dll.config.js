const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    libs: ['axios', 'vue', 'vue-router', 'vuex']
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].[hash:8].js',
    library: '[name]_library'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_library',
      path: path.join(__dirname, '../dll/', '[name]-manifest.json')
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,          // 删除警告
        compress: {
          drop_console: true,     // 去除日志
          drop_debugger: true     // 去除debugger
        },
        output: {
          comments: false         // 去除注释
        }
      },
      cache: true,                // 使用缓存
      parallel: true              // 开启多线程压缩
    })
  ]
}