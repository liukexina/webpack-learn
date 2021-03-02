const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader配置
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']  // 多个loader用use
      },
      {
        test: /\.js$/,
        exclude: /\node_module$/,   // 排除node_module文件下的js文件
        inclued: resolve(__dirname, 'src'),   // 只检查src下的js文件
        enforce: 'pre',  // 优先执行
        enforce: 'post', // 延后执行
        loader: 'eslint-loader',  // 单个loader用loader
        options: {}
      },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}