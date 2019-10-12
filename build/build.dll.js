const webpack = require('webpack');
const webpackDllConfig = require('./webpack.dll.config');

webpack(webpackDllConfig, (errout, stats) => {
  if (errout) throw errout;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  );
});
