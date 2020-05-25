const {
  resolve,
} = require('path');
const HtmlWebpackPlugin = require('html -webpack-plugin');

module.exports = {
  entry: {
    index: ['./src/index.js', './src/count.js'],
    add: './src/add.js',
  },
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名:优点简写路径缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css'),
    },
    // 配置省略文件路径的后缀名
    extensions: [' .js', ' .json', '.jsx', '.CSS'],
    // 告诉webpack 解析模块是去找哪个目录
    modules: [resolve(__dirname, ' ../../node_modules'), ' node_modules'],
  },
};