import webpack, { Entry, Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';

// add hot-reload related code to entry chunks
const baseConfigEntry = webpackBaseConfig.entry;
const devConfigEntry: Entry = {};
if (typeof baseConfigEntry === 'object' && !Array.isArray(baseConfigEntry)) {
  Object.keys(baseConfigEntry).forEach(entryName => {
    devConfigEntry[entryName] = ['webpack-hot-middleware/client'].concat(
      baseConfigEntry[entryName] as string
    );
  });
}

const webpackDevConfig: Configuration = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: devConfigEntry,
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
