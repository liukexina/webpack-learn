const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',  // 所有资源引入公共路径前缀
    chunkFilename:'[name]_chunk.js',  // 非入口chunk的名字
    library: '[name]',  // 整个库向外暴露的变量名
    libraryTarget: 'window'  // 变量名添加到哪个上 global/commonjs/amd/umd
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}