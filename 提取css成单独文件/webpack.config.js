const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置node环境变量
// process.env.NODE_ENV = 'development'
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          // MiniCssExtractPlugin.loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader',

          // css兼容性处理：postcss-->postcss-loader   postcss-preset-env
          // postcss-preset-env:帮助postcss在package.json中browserlist里面的配置，通过配置加载指定css的兼容性样式

          //   "browserslist": {
          // 开发环境：设置node环境变量：process.env.NODE_ENV = development
          //   "development": [
          //     "last 1 chrome version",
          //     "last 1 firefox version",
          //     "last 1 safari version"
          //   ],
          // 生产环境：默认看生产环境
          //   "production": [
          //     ">0.2%",
          //     "not dead",
          //     "not op_mini all"
          //   ]
          // }

          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-preset-env')()],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      // 对输出文件重命名
      filename: 'css/built.css',
    }),
  ],
  mode: 'development',
}
