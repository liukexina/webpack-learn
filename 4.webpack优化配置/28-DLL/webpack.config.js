const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
    publicPath: './'
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json') // 告诉webpack那些库不需要在打包
    }),
    // 将某个文件打包输出出去，并在html文件自动引入该资源  或者手动引入
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname,'dll/jquery.js')
    })
  ],
  mode: 'production'
}