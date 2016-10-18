var webpack = require('webpack');
var validate = require('webpack-validator');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  babelCache: path.resolve('./babel-cache'),
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
    // preLoaders run before the loaders do. In this case, eslint runs before
    // the build begins. 
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }],

    loaders: [{
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.js$/,
      // Test files are excluded here because they are loaded
      // by webpack.test.js
      exclude: /(node_modules|\.spec\.js$)/,
      loader: 'babel',
      query: {
        cacheDirectory: PATHS.babelCache
      }
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
