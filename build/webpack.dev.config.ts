import webpack, { Entry, Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';

// add hot-reload related code to entry chunks
Object.keys(webpackBaseConfig.entry as Entry).forEach(name => {
  (webpackBaseConfig.entry as Entry)[name] = [
    'webpack-hot-middleware/client',
  ].concat((webpackBaseConfig.entry as Entry)[name]);
});

const webpackDevConfig: Configuration = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
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
