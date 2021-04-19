import webpack from 'webpack';
import webpackProdConfig from './webpack.prod.config';

console.log('building for production...\n');

webpack(webpackProdConfig, (err, stats) => {
  if (err || stats?.hasErrors()) {
    process.stdout.write(
      stats?.toString({
        errors: true,
        errorDetails: true,
        warnings: true,
        colors: true,
        all: false,
      }) ?? ''
    );
    console.log('Build failed');
    throw err;
  }

  process.stdout.write(
    stats?.toString({
      all: false,
      colors: true,
      assets: true,
      version: true,
      excludeAssets: /media/,
    }) + '\n\n'
  );

  console.log('Build successfully \n');
});
