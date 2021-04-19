import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpackBaseConfig: Configuration = {
  entry: {
    app: './src/main.ts',
  },
  output: {
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 3,
              name: 'static/imgs/[name].[hash:7].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@src': path.resolve(__dirname, '../src'),
    },
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  plugins: [
    // 自动注入
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: './src/index.html',
    }),
    // 加载vue-loader
    new VueLoaderPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors',
          priority: -10,
        },
        commons: {
          chunks: 'all',
          name: 'commons',
          priority: -11,
          minChunks: 2,
        },
      },
    },
    runtimeChunk: 'single',
  },
};

export default webpackBaseConfig;
