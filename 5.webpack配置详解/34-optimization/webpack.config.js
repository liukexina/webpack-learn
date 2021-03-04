const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name]_[hash:10]_chunk.js'
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
  mode: 'production',
  // 解析模块的规则
  resolve: {
    // 配置解析模块别名，优点间写路径，缺点路径没提示
    alias: {
      $css: resolve(__dirname , 'src/css')
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 默认值，可以不写
      // minSize: 30 * 1024, // 分割的chunk最小为30kb
      // maxSize: 0, // 没有最大限制
      // minChunks: 1, // 要提取的chunk最少被引用1次
      // maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequest: 3, // 入口js文件最大并行请求数量
      // automaticNameDelimiter: '~', // 命名连接符
      // name: true, // 可以使用命名规则
      // cacheGroups: {
      //   // 分割chunk的组
      //   // node_modules文件会被打包到 vendors 组的chunk中 -->  vendors~xxx.js
      //   // 满足上面的公共规则，如：大小超过30kb, 至少被引用一次
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     // 优先级
      //     priority: -10,
      //   },
      //   default: {
      //     // 要提取的chunk最少被引用2次
      //     minChunks: 2,
      //     // 优先级
      //     priority: -20,
      //     // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包
      //     reuseExistingChunk: true
      //   }
      // }
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案： js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true,
      })
    ]
  }
}