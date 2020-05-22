const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // 排除css，js，html资源
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        options: {
          // 去图片hash值前10位，ext取文件原来的扩展名
          name: '[hash:10].[ext]',
        },
      },
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
  // 开发服务器devServer：自动编译、自动打开浏览器、自动刷新浏览器
  // 只会在内存中编译打包，不会输出
  // 启动devServer指令为：webpack-dev-server
  devServer: {
    // 项目构建后的路径
    // contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
}
