const path = require('path')
const webpack = require('webpack')
const ChromeReloadPlugin = require('wcer')
const happyPackLoder = require('./happpyPack')
const { resolve, page, assetsPath } = require('./util')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    popup: resolve('src/popup'),
    options: resolve('src/options'),
    content: resolve('src/content'),
    background: resolve('src/background'),
    inject: resolve('src/content/inject'),
  },
  output: {
    path: resolve('dist'),
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
          {
            loader: path.resolve(__dirname, './vue-style-loader/index.js'),
            query: { cacheDirectory: '.webpack_cache', },
          },
          'css-loader',
          'fast-sass-loader',
          {
            loader: path.resolve(__dirname, './important-loader.js'),
          },
        ]
      },
      {
        test: /\.sass$/,
        use: 'happypack/loader?id=sass',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ['vue-style-loader', 'css-loader', 'fast-sass-loader'],
            sass: ['vue-style-loader', 'css-loader', 'fast-sass-loader?indentedSyntax'],
          },
        },
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules/,
        include: [resolve('src'), resolve('node_modules/vue-echarts'), resolve('node_modules/resize-detector')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  plugins: [
    ...happyPackLoder(),
    page({
      title: 'popup title',
      name: 'popup',
      chunks: ['popup'],
    }),
    page({
      title: 'options title',
      name: 'options',
      chunks: ['options'],
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
      },
    ]),
    new ChromeReloadPlugin({
      port: 23333,
      manifest: resolve('src/manifest.js'),
    }),
  ],
  performance: {
    hints: false,
  },
}
