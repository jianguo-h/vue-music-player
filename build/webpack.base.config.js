const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/main.js',
		// vendors: ['vue', 'vue-router', 'vuex', 'axios']
	},
	output: {
		filename: 'js/app.buldle.js',
		path: path.resolve(__dirname, '../dist'),
		// chunkFilename: '[id].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
				options: {
					loaders: {
						js: 'babel-loader',
						css: 'vue-style-loader!css-loader!postcss-loader',
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
			{
		        test: /\.css$/,
		        use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240
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
							limit: 10240
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
			filename: 'index.html',
			template: './index.html',
			// chunks: ['vendors'],
			inject: true,
		}),
	]
}