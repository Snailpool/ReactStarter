const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
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
			use: [
				{
					loader: 'css-loader',
					options: {
						localIdentName: cssIdentName,
						importLoaders: 1,
						modules: true
					}
				},
				{
					loader: 'postcss-loader',	// TODO: 紀錄下來：卡了五小時結果是沒升級 => 先查詢相依版本再改寫法
					options: {
		              plugins: function () {
		                return [
							require('postcss-import'),
							require('precss'),
							require('autoprefixer')
		                ];
		              }
		            }
		        }
			]
		});
	plugins = [
		new ExtractTextPlugin('[name].[chunkhash].css'),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false
		}),
		new HtmlWebpackPlugin( { template: './index-tmp.html' } ),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	];
}
// if it's development time
else if (DEVELOPMENT) {
	plugins = [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
	];
	cssIdentName = '[path][name]---[local]';
	cssLoader = [
		{
			loader: 'style-loader'
		},
		{
			loader: 'css-loader',
			options: {
				localIdentName: cssIdentName,
				importLoaders: 2,
				modules: true 	// default css module
			}
		},
		{
			loader: 'postcss-loader',
			options: {
		              plugins: function () {
		                return [
		                  require('postcss-import'),
		                  require('precss'),
		                  require('autoprefixer')
		                ];
		              }
		            }
		}
	];
}

// main webpack config setting
module.exports = {
	entry: {
		app: ['react-hot-loader/patch','./src/app/index.js']	// in case there are another apps
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: PRODUCTION ? '[name].[chunkhash].js' : '[name].bundle.js',
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
					path.resolve(__dirname, '../src/app/components/')
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

// TODO: 分檔案
// TODO: Build 前要把舊的刪掉

