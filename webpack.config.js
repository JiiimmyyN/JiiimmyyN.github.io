var path = require('path');

module.exports = {
	//entry: ['webpack/hot/dev-server', path.resolve(__dirname, '../src/main.js')],
	entry: './src/main.js',
	output: { 
		path: path.resolve(__dirname, './'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
};
