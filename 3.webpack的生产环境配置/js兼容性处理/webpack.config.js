const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /*
      js兼容性处理：babel-loader @babel/core @babel/preset-env
      1.基本兼容性处理：@babel/preset-env                              问题：只能转化基本语法，如promise
      2.全部js兼容性处理：@babel/polyfill (直接入口文件import引入)      问题：全部引入文件大
      3.按需引入：core-js
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //  预设：指示babel做什么兼容性处理,
          // presets: ['@babel/preset-env'],
          // 按需引入
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定corejs版本
                corejs: {
                  version: 3,
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '8',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
}
