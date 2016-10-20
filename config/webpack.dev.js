var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var path = require('path');
var commonConfig = require('./webpack.common.js');

const DEV = webpackMerge(commonConfig, {
  // Fast source map generation
  devtool: 'cheap-module-eval-source-map',

  output: {
    // The dev server keeps the dev build in memory rather than writing it to disk
    path: path.resolve('./build'),
    filename: '[name].[hash].js'
  },

  plugins: [
    // Enable multi-pass compilation for enhanced performance
    // in larger projects. Good default.
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    })
  ],

  devServer: {
    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,

    // Unlike the cli flag, this doesn't set
    // HotModuleReplacementPlugin!
    hot: true,
    inline: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Set host name. The default is localhost.
    host: 'localhost',

    // Set port number. The default is 8080.
    port: 12345 // the spaceballs port!!! cf. https://youtu.be/a6iW-8xPw3k
  }
});

module.exports = validate(DEV);
