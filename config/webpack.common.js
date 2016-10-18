var webpack = require('webpack');
var validate = require('webpack-validator');
var path = require('path');

const PATHS = {
  build: path.resolve('./build'),
  main: path.resolve('src/main.js')
};

const COMMON = {
  entry: {
    main: PATHS.main
  }, 

  output: {
    filename: 'bundle.js',
    path: path.resolve('./build')
  }
}

module.exports = validate(COMMON);
