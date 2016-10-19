var webpack = require('webpack');
var validate = require('webpack-validator');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    }, {
      test: /\.css$/,
      // style-loader resolves css in 'require()' statements
      // css-loader resolves '@import'' and 'url()' statements
      // Note that, without the ExtractText plugin, the css
      // remains embedded in main.js
      //
      // '!' is like Unix's pipe, '|'. Reading right-to-left,
      // css is loaded first via the css-loader and then passed
      // to the style-loader
      loader: ExtractTextPlugin.extract('style', 'css')
    }]
  },

  plugins: [
    // HtmlWebpackPlugin injects scripts & links into index.html
    // so that we don't have to do so manually
    new HtmlWebpackPlugin({
      template: PATHS.index,
      showErrors: true // In prod, set this to false. The default is true
    }),

    // This plugin extracts the css from js and places it in its own file
    new ExtractTextPlugin('[name].css')
  ]
};

module.exports = validate(COMMON);
