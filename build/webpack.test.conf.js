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
    path: resolve('/test/dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "fast-css-loader" },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: [
          { loader: "style-loader" },
          'fast-css-loader',
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
    })
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'app': resolve('src/app'),
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'test/dist'),
    port: '8888',
    hot: true,
  }
}
