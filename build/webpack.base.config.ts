/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
const { VueLoaderPlugin } = require('vue-loader');

const isProduction = process.env.NODE_ENV === 'production';
const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const webpackBaseConfig: Configuration = {
  entry: {
    app: './src/main.ts',
  },
  output: {
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    assetModuleFilename: 'static/media/[name].[hash:8].[ext]',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: !isProduction,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader'],
      },
      {
        test: /.less$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          'postcss-loader',
        ],
      },
      {
        exclude: [
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /\.vue$/,
          /\.(css|sass|scss|less)$/,
        ],
        type: 'asset/resource',
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
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : undefined,
    }),
    // 加载vue-loader
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      },
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
};

export default webpackBaseConfig;
