const {
  resolve
} = require('path')

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  // loader
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  // plagins
  plugins: [],
  mode: 'development',
  // mode: 'production'
}