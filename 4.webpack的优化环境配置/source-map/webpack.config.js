/*
source-map： 提供源代码到构建后代码映射技术（如果构建后代码出错，通过映射可以追踪源代码错误）
  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

  source-map：外部
    (错误代码的准确信息  和  源代码的错误位置)

  inline-source-map:内联
    只生成一个内联source-map
    (错误代码的准确信息  和  源代码的错误位置)

*** hidden-source-map：外部
  (错误代码的准确信息,但没有错误位置，不能追踪到源代码错误，只能提示到构建后的代码错误提示位置)

  eval-source-map：内联
    每个文件生成对应的source-map，都在eval
    (错误代码的准确信息  和  源代码的错误位置)

*** nosources-source-map：外部
  (错误代码的准确信息 ，但是没有任何源代码信息)

  cheap-source-map：外部
  (错误代码的准确信息  和  源代码的错误位置   只能精确到行)

  cheap-module-source-map：外部
  (错误代码的准确信息  和  源代码的错误位置)
  module 会将 loader 的 source-map 加入

  开发环境：速度快，调试更友好
    速度快：（eval>inline>cheap。。。）
      eval-cheap-source-map
      eval-source-map
    调试更友好：
      source-map
      cheap-module-source-map
      cheap-source-map

---> eval-source-map / eval-cheap-module-source-map

  生产环境：源代码要不要隐藏？调试要不要友好
  ***内联会增大体积，生产不用内联
    nosources-source-map:全部隐藏
    hidden-source-map：隐藏构建后的代码

---> source-map / cheap-module-source-map
*/
const {
  resolve,
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
  devtool: 'source-map',
};