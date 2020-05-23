const {
  resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/js/index.js',
  entry: {
    main: './src/js/index.js',
    test: './src/js/test.js',
  },
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  // js压缩
  mode: 'production',
};