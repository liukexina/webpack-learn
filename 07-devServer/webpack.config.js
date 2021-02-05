const {resolve}  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, 
      {
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
  mode: 'development',
  
  devServer: {
    // 项目构建后的路径
    contentBase: resolve(__dirname, 'build'),
    // 开启gzip压缩
    compress: true,
    // 端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
  }
}
