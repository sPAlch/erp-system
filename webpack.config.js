var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './app.js',
        vendor: ['angular']  
    },
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    devServer: {
        inline: true,
        port: 8008,
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new HtmlWebpackPlugin()
    ]
};