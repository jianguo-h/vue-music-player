const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['./src/main.js'],
	output: {
		filename: 'app.buldle.js',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			/*{
				enforce: 'pre',
				test: /\.(js|vue)$/,
				exclude: [
					path.resolve(__dirname, '../node_modules'),
					path.resolve(__dirname, '../dist')
				],
				use: ['eslint-loader']
			},*/
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader',
						less: "vue-style-loader!css-loader!postcss-loader!less-loader"
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},  
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
			},
			/*{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10240
					}
				}
			}*/
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
		},
		extensions: ['.js', '.vue', '.json']
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			inject: true
		}),
	]
}