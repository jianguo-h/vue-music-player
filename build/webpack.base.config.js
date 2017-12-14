const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/main.js',
		vendors: ['vue', 'vue-router', 'vuex', 'axios', 'mint-ui']
	},
	output: {
		filename: 'js/app.buldle.js',
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
			'vue': 'vue/dist/vue.esm.js'
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
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'js/vendors.js',
			allChunks: true,
			minChunks: Infinity
		}),
	]
}