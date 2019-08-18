const path = require('path')
const webpack = require('webpack')
const { resolve } = require('./util')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(baseConf, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new CleanWebpackPlugin(['dist/*.*']),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
})
