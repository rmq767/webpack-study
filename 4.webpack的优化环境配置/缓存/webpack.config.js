const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 单独提取css成文件插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
babel缓存：cacheDirectory: true
文件资源缓存：
    hash：每次webpack构件时会生成一个唯一的hash值。
      问题：因为js和css同时使用一个hash。如果重新打包，会导致所有缓存失效（可能我只改动一个文件）
    chunkhash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样。
      问题：js和css的hash值还是一样的------因为css是在js中被引入的，属于同一个chunk
    contenthash：根据文件内容生成hash，不同的文件hash值不一样

*/

// 设置node环境变量,决定browserlist使用那个环境
process.env.NODE_ENV = 'production'
// 复用loader
const commonCssLoader = [
  // 让js中的css单独成文件
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()],
    },
  },
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        // 注意：不能有两个配置处理同一种类型文件
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader'],
          },
          {
            // js兼容性处理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3,
                    },
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '8',
                      safari: '10',
                      edge: '17',
                    },
                  },
                ],
              ],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true,
            },
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
            },
          },
          {
            // 处理html中的img图片
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            exclude: /\.(html|js|css|less|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 提取css
      filename: 'css/built.[contenthash:10].css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
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
  devtool: 'source-map',
}
