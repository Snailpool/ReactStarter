const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./webpack.base.js');

module.exports = webpackMerge(base, {
	output: {
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								localIdentName: '[hash:base64:5]',
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
										require('postcss-cssnext')
									];
								}
							}
						}
					]
				}),
				include: [
					path.resolve(__dirname, '../src/app/components/')
				]
			}
		]
	},
	plugins: [
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
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module) {
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		})
	]
})