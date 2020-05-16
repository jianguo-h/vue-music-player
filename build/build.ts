import webpack from 'webpack';
import webpackProdConfig from './webpack.prod.config';

console.log('building for production...\n');
webpack(webpackProdConfig, (errout, stats) => {
  if (errout) throw errout;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n'
  );

  console.log('Build complete \n');
  console.log(
    'Tip: built files are meant to be served over an HTTP server.\n' +
      "Opening index.html over file:// won't work.\n"
  );
});
