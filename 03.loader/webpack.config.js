const { loadavg } = require('os');
const { resolve } = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: 'loader1'
        // use:[
        //   // 从下到上、从右到左
        //   'loader1',
        //   'loader2',
        //   {
        //     loader: 'loader3',
        //     options: {
        //       age: 18,
        //       name: 'jake'
        //     }
        //   }
        // ]
        loader: 'babelLoader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      }
    ]
  },
  // 配置loader解析规则
  resolveLoader: {
    // loader路径
    modules: [
      'node_modules',
      resolve(__dirname, 'loaders')
    ]
  },
  // mode: 'development'
}