const { validate } = require('schema-utils')
const globby = require('globby');
const path = require('path');
const fs = require('fs')
const util = require('util')
const webpack = require('webpack')
const { RawSource } = webpack.sources

// 将fs.readFile方法变成基于promise风格的异步
const readFile = util.promisify(fs.readFile)

const schema = require('./schema.json')

class CopyWebpackPlugin {
  constructor(options) {
    // 验证option是否符合规范
    validate(schema, options, {
      name: 'CopyWebpackPlugin'
    })

    this.options = options;
  }

  apply(complier) {
    // 初始化compilation钩子
    complier.hooks.thisCompilation.tap('Plugin2',(compilation) => {
      // 添加资源的hooks
      compilation.hooks.additionalAssets.tapAsync('Plugin2',async (callback) => {
        // 将from中的资源复制到to中，输出出去
        const { from, ignore } = this.options;
        const to = this.options.to ? this.options.to : '.'

        // 1.过滤ignor中的资源
        // context就是webpack配置
        // 运行指定的目录
        const context = complier.options.context;  // process.cwd()

        // 将输入路径变成绝对路径
        const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from);
        
        // globby(要处理文件夹，options)
        const paths = await globby(absoluteFrom, { ignore }) // 所有要加载的文件路径数组

        // 2.读取paths中的所有资源
        const files = await Promise.all(
          paths.map(async (absolutePath) => {
            // 读取文件
            const data = await readFile(absolutePath)
            // basename得到最后的文件名称
            const relativePath = path.basename(absolutePath) 
            // 和to属性结合
            // 没有to  --> reset.css
            // 有to   --> css/reset.css
            const filename = path.join(to, relativePath)
            
            return {
              // 文件数据
              data, 
              // 文件名称
              filename
            }
          })
        )

        // 3.生成webpack格式的资源
        const assets = files.map((file) => {
          const source = new RawSource(file.data);
          return {
            source,
            filename: file.filename
          }
        })

       // 4.添加compilation中，输出出去
        assets.forEach(asset => {
          compilation.emitAsset(asset.filename, asset.source)
        })
        callback();
      })
    })
  }
}

module.exports = CopyWebpackPlugin