const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const webpackDllConfig = require('./webpack.dll.config');

console.log('building for production...\n');
const dllPath = path.resolve(__dirname, '../dll');

rimraf(dllPath, err => {
  if(err) throw err;

  webpack(webpackDllConfig, (errout, stats) => {
    if(errout) throw errout;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');
  });
});
