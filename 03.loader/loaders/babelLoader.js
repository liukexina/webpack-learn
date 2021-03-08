const { getOptions } = require('loader-utils'); 
const { validate } = require('schema-utils')
const babel = require('@babel/core')
const util = require('util');

const schema = require('./babelSchema.json')

const transform = util.promisify(babel.transform)
module.exports = function(content, map, meta) {
  // 获取loader的options配置
  const options = getOptions(this) || {};
  // 校验babel的option配置
  validate(schema, options, {
    name: 'Babel Loader'
  })

  // 创建异步
  const callback = this.async();

  // 使用babel编写代码
  transform(content, options)
    .then(({code, map}) => callback(null, code, map, meta))
    .catch((e) => callback(e))
}