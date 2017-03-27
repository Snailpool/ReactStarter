const path = require('path');

// Common config setting
module.exports = {
	entry: {
		app: ['react-hot-loader/patch', './src/app/index.js']	// in case there are another apps
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [
					path.resolve(__dirname, '../src/app/')
				]
			},
			{
				test: /\.(jpg|jpeg|png|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '/images/[hash:6].[ext]'
				}
			}
		]
	}
}