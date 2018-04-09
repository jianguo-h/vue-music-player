const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/main.js',
		vendors: ['vue', 'vue-router', 'vuex', 'axios', 'mint-ui']
	},
	output: {
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[name].[chunkhash].js',
		path: path.resolve(__dirname, '../dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},  
			
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024 * 10
						}
					}
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024 * 10
						}
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['.js', '.vue', '.json']
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			filename: 'index.html',
			template: './index.html'
		}),
		// 提取公共的js
		/*new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'js/vendors.js',
			allChunks: true,
			minChunks: Infinity
		}),*/
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: {
		            minChunks: 2,
		            priority: -20,
		            reuseExistingChunk: true
		        },
				commons: {
		            name: "commons",
		            chunks: "initial",
		            minChunks: 2
		        },
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					name: 'vendors',
					priority: -10
				}
			}
		},
		runtimeChunk: 'single'
	}
}