const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'scrape.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scrape.js',
    publicPath: '/'
  },
  target: 'node',
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {presets: ['@babel/preset-react','@babel/preset-env']}
        }
      }
    ]
  }
};
