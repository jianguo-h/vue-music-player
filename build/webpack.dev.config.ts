import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';

const webpackDevConfig: Configuration = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: 'static/js/[name].[fullhash:8].js',
  },
  plugins: [
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx', '.vue'],
      emitWarning: true,
      emitError: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      },
    }),
  ],
});

export default webpackDevConfig;
