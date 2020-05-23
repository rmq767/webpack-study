const {
  resolve,
} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独提取css成文件插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 设置node环境变量,决定browserlist使用那个环境
process.env.NODE_ENV = production;
// 复用loader
const commonCssLoader = [
  // 让js中的css单独成文件
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')(),
      ],
    },
  },
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [{
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
        oneOf: [{
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [
              ...commonCssLoader,
              'less-loader',
            ],
          },
          {
            // js兼容性处理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel-preset-env',
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
      filename: 'css/built.css',
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
};