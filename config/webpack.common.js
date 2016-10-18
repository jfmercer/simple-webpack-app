var webpack = require('webpack');
var validate = require('webpack-validator');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  build: path.resolve('./build'),
  index: path.resolve('./src/index.html'),
  main: path.resolve('src/main.js')
};

const COMMON = {
  entry: {
    main: PATHS.main
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./build')
  },

  // Configure loaders for various filetypes
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html'
    }],
  },

  plugins: [
    // HtmlWebpackPlugin injects scripts & links into index.html
    // so that we don't have to do so manually
    new HtmlWebpackPlugin({
      template: PATHS.index,
      showErrors: true // In prod, set this to false. The default is true
    })
  ]
}

module.exports = validate(COMMON);
