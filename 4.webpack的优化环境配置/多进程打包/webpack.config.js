const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 单独提取css成文件插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

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
            use: [
              /*
                开启多进程打包。
                进程启动大概为600ms，进程通信也有开销。
                只有工作消耗时间比较长，才需要多进程打包
              */
              'thread-loader',
              {
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
            ],
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
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1.帮助 serviceworker 快速启动
        2.删除旧的 serviceworker
        生成一个 serviceworker 的配置文件
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  // js压缩
  mode: 'production',
  devtool: 'source-map',
}
