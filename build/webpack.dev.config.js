const webpack = require('webpack');
const config = require('../config');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

// add hot-reload related code to entry chunks
Object.keys(webpackBaseConfig.entry).forEach(name => {
  webpackBaseConfig.entry[name] = ['webpack-hot-middleware/client'].concat(webpackBaseConfig.entry[name])
});

const webpackDevConfig = webpackMerge(webpackBaseConfig, {
  mode: config.dev.env,
  devtool: '#cheap-module-eval-source-map',
  output: {
    publicPath: config.dev.publicPath
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            js: 'babel-loader',
            css: 'vue-style-loader!css-loader!postcss-loader',
            less: "vue-style-loader!css-loader!postcss-loader!less-loader"
          }
        }
      }
    ]
  },
  plugins: [
    /*new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(config.dev.env)
    }),*/
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()
  ]
});

module.exports = webpackDevConfig;