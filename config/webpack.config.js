const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// envieroment setting
const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

let plugins = [];
let cssLoader = {};
let cssIdentName = '';

// if it's production time
if (PRODUCTION) {
	cssIdentName = '[hash:base64:5]';
	cssLoader =
		ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: {
				loader: 'css-loader',
				options: {
					localIdentName: cssIdentName
				}
			}
		});
	plugins = [
		new ExtractTextPlugin('[name].bundle.css'),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false
		})
	];
}
// if it's development time
else if (DEVELOPMENT) {
	plugins = [
		new webpack.HotModuleReplacementPlugin()
	];
	cssIdentName = '[path][name]---[local]';
	cssLoader = [
		{
			loader: 'style-loader'
		},
		{
			loader: 'css-loader',
			options: {
				localIdentName: cssIdentName
			}
		}
	];
}

// main webpack config setting
module.exports = {
	entry: {
		app: './src/app/index.js'	// in case there are another apps
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
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
			},
			{
				test: /\.css$/,
				use: cssLoader,
				include: [
					path.resolve(__dirname, '../src/app/')
				]
			}
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, '..'),
		compress: true,
		hot: true,
		port: 3000
	},
	plugins: plugins
}


