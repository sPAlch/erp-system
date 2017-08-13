const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
          filename: '[name].css',
          disable: process.env.NODE_ENV === 'development'
      });

module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './app.js',
        vendor: [
          'angular',
          'angular-route',
          'angular-touch',
          'angular-animate',
          'angular-ui-bootstrap',
          'ngstorage',
          'jquery',
          'lodash'
        ]  
    },
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },
    devServer: {
        inline: true,
        https: true,
        public:'0.0.0.0:3000',
        port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: extractSass.extract(
            {
              use: [
                {
                  loader: "css-loader"
                }, 
                {
                  loader: "sass-loader"
                }
              ],
              // use style-loader in development 
              fallback: "style-loader"
            }
          )
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          loaders: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              query: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]'
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        { test: /\.html$/, loader: 'html-loader' }        
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(
        {
          title : 'ERP system',
          template: 'index.ejs'
        }
      ),
      new PreloadWebpackPlugin(),
      new webpack.optimize.CommonsChunkPlugin(
          { 
            name: 'vendor', 
            filename: 'vendor.js' 
          }
        ),
      extractSass
    ]
};