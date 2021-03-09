const webpack = require('webpack')
const fs = require('fs')
const { resolve } = require('path')
const util = require('util')
const { RawSource } = webpack.sources

// 将fs.readFile方法变成基于promise风格的异步
const readFile = util.promisify(fs.readFile)

class Plugin2 {
  apply(complier) {
    // 初始化compilation钩子
    complier.hooks.thisCompilation.tap('Plugin2',(compilation) => {
      // debugger
      // console.log(compilation)
      compilation.hooks.additionalAssets.tapAsync('Plugin2',async (callback) => {

        const str = 'hello world'
        // 往输出资源中，添加一个a.txt
        compilation.assets['a.txt'] = {
          // 文件大小
          size() {
            return str.length
          },
          // 文件内容
          source() {
            return str
          }
        }

        const data = await readFile(resolve(__dirname, 'b.txt'))  // buffer数据
        // compilation.assets['b.txt'] = new RawSource(data) // 和下方等价
        compilation.emitAsset('b.txt', new RawSource(data))
        callback() 
      })
    })
  }
}

module.exports = Plugin2;