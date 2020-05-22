const {
  resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置node环境变量
// process.env.NODE_ENV = 'development'
// 压缩css 插件 ： optimize-css-assets-webpack-plugin
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [require('postcss-preset-env')()],
          },
        },
      ],
    }, ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      // 对输出文件重命名
      filename: 'css/built.css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development',
}