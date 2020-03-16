const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = function () {
  return [
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS的参数如下：
      uglifyJS: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          reduce_vars: true,
          drop_console: false,
          collapse_vars: true,
        }
      }
    }),
  ]
}