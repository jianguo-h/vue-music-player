const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackProdConfig = webpackMerge(webpackBaseConfig, {
	mode: config.prod.env,
	devtool: false,
	output: {
		publicPath: config.prod.publicPath
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
				options: {
					loaders: {
						js: ['babel-loader'],
						less: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
						css: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
					}
				}
			}
		]
	},
	plugins: [
		/*new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(config.prod.env)
		}),*/
		// 提取less和css
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css'
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
		/*new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,		// 去除日志
				drop_debugger: true		// 去除debugger
			},
			except: ['$super', '$', 'exports', 'require'],
			sourceMap: true
		}),*/
		// 拷贝静态文件
		new CopyWebpackPlugin([
			{
				from: path.join(__dirname, '../static'),
				to: 'static'
			}
		])
	]
});

module.exports = webpackProdConfig;