const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
    publicPath:'./'
  },
  module: {
    rules: [
      /* 语法检查 eslint-loader eslint 
        注意：只检查自己写的源代码，第三方的库是不用检查的
        设置检查规则：
          airbnb
          package-json中eslintConfig中设置～
            "eslintConfig": {
              "extends": "airbnb-base"
            }
          airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'built.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      // filename: 'css/built.css'
    }),
  ],
  mode: 'development'
}