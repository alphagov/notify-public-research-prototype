const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './app/components/client'
  ],
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: 'bundle.js',
    publicPath: '/public/javascripts'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
      query: {
        plugins: ['react-hot-loader/babel'],
        presets: ['es2015-webpack', 'stage-3', 'react']
      }
    }]
  }
}
