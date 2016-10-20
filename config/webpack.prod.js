var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  build: path.resolve('./build'),
  index: path.resolve('./src/index.html')
};

const PROD = webpackMerge(commonConfig, {
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },

  plugins: [
    // This plugin will cause the build to fail if any errors
    // are thrown. Useful primarily on production builds.
    new webpack.NoErrorsPlugin(),

    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugins optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurenceOrderPlugin(),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    //
    // For demonstration purposes, this is disabled so that the
    // 0.0.js chunk does not disappear
    //
    // new webpack.optimize.MinChunkSizePlugin({
    //   minChunkSize: 51200 // ~50kb
    // }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    new HtmlWebpackPlugin({
      template: PATHS.index,
      // This is somewhat counterintuitive. Normally, one would *want* an error
      // to stop the build. However, this plugin doesn't throw console errors:
      // it injects errors into the HTML document itself. Clearly, this is not
      // desirably in production.
      showErrors: false
    })
  ]
});

module.exports = validate(PROD);
