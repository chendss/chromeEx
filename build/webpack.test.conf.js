const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ChromeReloadPlugin = require('wcer')
const happyPackLoder = require('./happpyPack')
const { resolve, page, assetsPath } = require('./util')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    test: resolve('test'),
  },
  output: {
    path: resolve('test-dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: path.resolve(__dirname, './vue-style-loader/index.js'),
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: [
          'css-loader',
          'fast-sass-loader',
          {
            loader: path.resolve(__dirname, './important-loader.js'),
          },
        ]
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'test/index.html', //本地自定义模板
      inject: true
    })
  ],
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'test-dist'),
    port: '8888',
    hot: true
  }
}
