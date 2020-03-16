const HappyPack = require('happypack')
const path = require('path')

const happyThreadPool = HappyPack.ThreadPool({ size: 5 })

module.exports = function () {
  return [
    new HappyPack({
      id: 'scss',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: path.resolve(__dirname, './vue-style-loader/index.js'),
        },
        'css-loader',
        'sass-loader',
        {
          loader: path.resolve(__dirname, './important-loader.js'),
        },
      ]
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader']
    }),
  ]
}