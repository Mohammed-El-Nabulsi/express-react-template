var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var htmlWebpackTemplate = require('html-webpack-template');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.join(__dirname),
	entry: ['babel-polyfill', 'src/frontend/main.jsx'],
	output: {
		path: path.join(__dirname, 'build/frontend'),
		filename: '[name].bundle.js',
		publicPath: '/build/',
	},

	watch: true,

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css'),
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'file',
			},
			{
				test: /\.(ttf|eot|svg|woff|woff2)$/,
				loader: 'file',
			},
		],
	},

	postcss: function() {
		return [autoprefixer];
	},

	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			jQuery: 'jquery',
			$: 'jquery',
		}),
		new ExtractTextPlugin('[name].bundle.css', {
			allChunks: true,
		}),
		new HtmlWebpackPlugin({
			title: 'Tick-Tack-Toe',
			inject: false,
			template: htmlWebpackTemplate,
			appMountId: 'app',
			mobile: true,
		}),
	],

	resolve: {
		root: [path.resolve(__dirname, 'node_modules')],
		modulesDirectories: ['node_modules', '.'],
		extensions: ['', '.js', '.jsx'],
	},
};
