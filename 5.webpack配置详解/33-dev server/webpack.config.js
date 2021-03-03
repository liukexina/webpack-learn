const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    // 配置解析模块别名，优点间写路径，缺点路径没提示
    alias: {
      $css: resolve(__dirname , 'src/css')
    },
  },
  devServer: {
    // 项目构建后的路径
    contentBase: resolve(__dirname, 'build'),
    // 构建目录下，一旦有文件发生改变，就reload
    watchContenBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    // 开启gzip压缩
    compress: true,
    // 端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不显示启动服务器日志信息
    clientLogLevel:'none',
    // 除了一些基本启动服务信息，其他内容都不显示
    quite: true,
    // 出错了，不要全屏提醒
    overlay: false,
    // proxy
    proxy: {
      '/api': {
        target: 'http://vis.movie.st.sankuai.com',
        pathRewrite: { '/api': '/api' },
      },
    },
  }
}