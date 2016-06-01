const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '#': path.join(__dirname, 'src'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
    ],
  },
};

if (!isProd) {
  module.exports.devtool = '#source-map';
}
