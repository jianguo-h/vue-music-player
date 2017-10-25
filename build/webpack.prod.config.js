const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackProdConfig = webpackMerge(webpackBaseConfig, {
	devtool: false,
	output: {
		publicPath: config.build.publicPath
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader', 
					use: ['css-loader', 'less-loader']
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader', 
					use: ['css-loader']
				})
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						less: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: ['css-loader', 'less-loader']
						}),
						css: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: ['css-loader']
						}),
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(config.build.env)
		}),
		// 提取less和css
		new ExtractTextPlugin({
			filename: 'css/app.bundle.css'
		}),
		// 压缩css
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		}),
		// 压缩混淆js
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			except: ['$super', '$', 'exports', 'require'],
			sourceMap: true
		}),
		// 提取公共的js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'js/vendors.js',
			allChunks: true
			// minChunks: Infinity
		}),
		new CopyWebpackPlugin([
			{
				from: path.join(__dirname, '../static'),
				to: 'static'
			}
		])
	]
});

module.exports = webpackProdConfig;