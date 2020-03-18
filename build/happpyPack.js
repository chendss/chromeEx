const HappyPack = require('happypack')
const path = require('path')
const os = require('os')
const { assetsPath } = require('./util')

const happyThreadPool = HappyPack.ThreadPool({ size: Math.floor(os.cpus().length / 2) })

const baseParam = function (id) {
  return {
    id,
    verbose: true,
    threadPool: happyThreadPool,
  }
}

module.exports = function () {
  return [
    // new HappyPack({
    //   ...baseParam('js'),
    //   loaders: [
    //     {
    //       loader: 'babel-loader?cacheDirectory=true',
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