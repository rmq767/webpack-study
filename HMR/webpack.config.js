/*
HMR:hot module replacement 热模块替换
  作用：一个模块发生变化，只会重新打包这一模块（而不是打包所有模块），极大提升构建速度

  样式文件：可以使用 HMR 功能，因为style-laoder内部实现了
  js文件：默认不能使用 HMR  --> 需要修改js代码，添加支持 hmr 功能的代码
    注意：HMR 功能对js的处理，只能非js文件的其他文件。
  html文件：默认不能使用 HMR，同时html不能热更新了 (不用做 hmr)
    解决：修改 entry ，将html文件引入
*/
const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader配置
      // 处理css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 处理less
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      // 处理图片
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
        },
      },
      // 处理html中图片
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // 处理其他资源
      {
        exclude: /\.(css|less|html|jpg|png|gif|js)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    // html配置
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
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
    open: true,
    // 开启HMR，修改配置必须重启webpack服务
    hot: true,
  },
  mode: 'development',
};