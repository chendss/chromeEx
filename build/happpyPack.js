const HappyPack = require('happypack')
const path = require('path')
const os = require('os')
const { assetsPath } = require('./util')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const baseParam = function (id) {
  return {
    id,
    verbose: true,
    threadPool: happyThreadPool,
  }
}

module.exports = function () {
  return [
    new HappyPack({
      ...baseParam('js'),
      loaders: [
        {
          loader: 'babel-loader?cacheDirectory=true',
        },
      ],
    }),
    // new HappyPack({
    //   ...baseParam('scss'),
    //   loaders: [
    //     {
    //       loader: path.resolve(__dirname, './vue-style-loader/index.js'),
    //       query: { cacheDirectory: '.webpack_cache', },
    //     },
    //     'css-loader',
    //     'fast-sass-loader',
    //     {
    //       loader: path.resolve(__dirname, './important-loader.js'),
    //     },
    //   ],
    // }),
    new HappyPack({
      ...baseParam('sass'),
      loaders: [
        {
          loader: path.resolve(__dirname, './vue-style-loader/index.js'),
        },
        'css-loader',
        'fast-sass-loader?indentedSyntax',
      ],
    }),
    new HappyPack({
      ...baseParam('vue'),
      loaders: ['vue-loader'],
    }),
  ]
}