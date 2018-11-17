const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonJSConfig = {
  entry: ['./index.js'],
  module: {
    rules: [],
  },
  target: 'web'
};

const rawConfig = Object.assign({}, commonJSConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'galactrum-lib.js',
    library: 'galactrum.js',
    libraryTarget: 'umd',
  }
});
const uglifiedConfig = Object.assign({}, commonJSConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'galactrum-lib.min.js',
    library: 'galactrum.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new UglifyJsPlugin()
  ]
});

module.exports = [rawConfig, uglifiedConfig];
