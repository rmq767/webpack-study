/* 
开发环境配置
webpack:打包输出
npx webpack-dev-server:内存中编译打包，不会输出
*/


const {
  resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader配置
      // 处理css
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      },
      // 处理less
      {
        test: /\.less$/,
        use: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      },
      // 处理图片
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      // 处理html中图片
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // 处理其他资源
      {
        exclude: /\.(css|less|html|jpg|png|gif|js)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    // html配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 配置开发环境
  devServer: {
    // 项目构建后的路径
    contentBase: resolve(__dirname, 'build'),
    // gzip
    compress: true,
    // port
    port: 3000,
    // 浏览器
    open: true
  },
  mode: 'development'
}