const {
  resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(jpg|png|gif)$/,
      //   // url-load 依赖于 file-loader
      //   loader: 'url-loader',
      //   options: {
      //     // 图片大小小于8kb，就会被base64处理，
      //     limit: 8 * 1024,
      //     // 去图片hash值前10位，ext取文件原来的扩展名
      //     name: '[hash:10].[ext]'
      //   },
      // },
      // {
      //   test: /\.html$/,
      //   // 处理html文件的img图片，（负责引入img，从而被url-loader处理）
      //   loader: 'html-loader'
      // }
      {
        // 排除css，js，html资源
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        options: {
          // 去图片hash值前10位，ext取文件原来的扩展名
          name: '[hash:10].[ext]'
        },
      }
    ],
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