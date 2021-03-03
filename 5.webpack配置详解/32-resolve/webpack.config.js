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
    // 配置省略文件路径的后缀名，使用匹配到的第一个
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉webpack解析模块去哪个目录找
    modules: [resolve(__dirname, '../../node_modules'),'node_modules']
  }
}