const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [],
  },
  plugins: [
    // 默认会创建一个空html文件，自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      // 复制文件，自动引入打包输出所有资源
      template: './src/index.html',
    }),
  ],
  mode: 'development',
}
