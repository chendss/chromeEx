const HappyPack = require('happypack')
const path = require('path')

const baseParam = function (id) {
  return {
    id,
    threads: 2,
    cache: true,
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
    new HappyPack({
      ...baseParam('scss'),
      loaders: [
        {
          loader: path.resolve(__dirname, './vue-style-loader/index.js'),
          query: { cacheDirectory: '.webpack_cache', },
        },
        'css-loader',
        'sass-loader',
        {
          loader: path.resolve(__dirname, './important-loader.js'),
          query: { cacheDirectory: '.webpack_cache', },
        },
      ],
    }),
    new HappyPack({
      ...baseParam('sass'),
      loaders: [
        {
          loader: path.resolve(__dirname, './vue-style-loader/index.js'),
        },
        'css-loader',
        'sass-loader?indentedSyntax',
      ],
    }),
    new HappyPack({
      ...baseParam('vue'),
      loaders: ['vue-loader'],
    }),
  ]
}