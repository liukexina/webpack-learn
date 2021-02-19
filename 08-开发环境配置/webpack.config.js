const {resolve}  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'build'),
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, 
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, 
      {
        test: /\.(jpg|png|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[hash:10].[ext]',
          outputPath: 'img'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // 排除
        exclude: /\.(css|js|html|jpg|png|jpeg|less)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
  mode: 'development',
  devServer: {
    // 项目构建后的路径，告诉服务器从哪里提供内容
    contentBase: resolve(__dirname, 'build'),
    // 开启gzip压缩
    compress: true,
    // 端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
    // 将用于确定应该从哪里提供 bundle，并且此选项优先
    // publicPath: '/dist/'
  }
}
