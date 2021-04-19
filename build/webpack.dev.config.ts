import webpack, { Entry, Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';

const webpackDevConfig: Configuration = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: 'static/js/[name].[fullhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

export default webpackDevConfig;
