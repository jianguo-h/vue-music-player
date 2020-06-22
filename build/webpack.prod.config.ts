import path from 'path';
import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpackBaseConfig from './webpack.base.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { libsPath } from '../config';

const webpackProdConfig: Configuration = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            js: ['babel-loader'],
            less: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'less-loader',
            ],
            css: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
          },
        },
      },
    ],
  },
  plugins: [
    // 每次打包前清除dist目录
    new CleanWebpackPlugin(),
    // dllPlugin
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(libsPath + '/libs-manifest.json'),
    }),
    // 将dllplugin生成的js自动注入到html中
    new AddAssetHtmlPlugin({
      publicPath: '/static/js/',
      filepath: path.resolve(libsPath, '*.js'),
      // 不加这个会在dist目录下多出一个libs.js文件，并不会到dist/static/js目录下去，原因未知
      // https://github.com/SimenB/add-asset-html-webpack-plugin/issues/82
      outputPath: 'static/js',
    }),
    // 提取less和css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    }),
    // 压缩混淆js
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false, // 删除警告
        compress: {
          drop_console: true, // 去除日志
          drop_debugger: true, // 去除debugger
        },
        output: {
          comments: false, // 去除注释
        },
      },
      cache: true, // 使用缓存
      parallel: true, // 开启多线程压缩
    }),
  ],
});

export default webpackProdConfig;
