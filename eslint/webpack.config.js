const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [{
      /*
      语法检查：eslint-loader eslint
      注意：只检查自己的代码，不检查第三方库
      设置检查规则：
      package.json中eslintConfig中设置
      airbnb --> eslint-config-airbnb-base eslint-plugin-import
        "eslintConfig": {
        "extends": "airbnb-base"
      }
      */
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      options: {
        // 自动修复eslint
        fix: true,
      },
    }, ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};