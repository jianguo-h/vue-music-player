const webpack = require('webpack');
const config = require('../config');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

// add hot-reload related code to entry chunks
webpackBaseConfig.entry = ['webpack-hot-middleware/client'].concat(webpackBaseConfig.entry);

const webpackDevConfig = webpackMerge(webpackBaseConfig, {
	devtool: '#cheap-module-eval-source-map',
	output: {
		publicPath: config.dev.publicPath
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(config.dev.env)
		}),
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoEmitOnErrorsPlugin()
	]
});

module.exports = webpackDevConfig;