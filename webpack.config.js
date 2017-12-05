var path = require('path');

module.exports = {
	entry: './src/main.js',
	output: { 
		path: path.resolve(__dirname, './'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2017', 'react']
				}
			},
			{ 
				test: /\.(css|styl)$/,
				loader: "style-loader!css-loader!stylus-loader", 
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			}
		]
	}
};
