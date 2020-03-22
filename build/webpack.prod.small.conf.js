const path = require('path')
const webpack = require('webpack')
const { resolve } = require('./util')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = merge(baseConf, {
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new CleanWebpackPlugin(['dist/*.*']),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
})
