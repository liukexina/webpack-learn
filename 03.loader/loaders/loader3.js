// loader本质上是一个函数
// 获取loader的options
const { getOptions } = require('loader-utils'); 
// 校验options是否满足规则
const { validate } = require('schema-utils')


const schema = require('./schema.json')
/*
  content: 文件内容
  map: 文件sourcemap对应信息
  meta
*/
module.exports = function(content, map, meta) {
  const options = getOptions(this)
  console.log(333)
  console.log(options)
  validate(schema, options, {
    name: 'loader1'
  })
  return content
}

module.exports.pitch = function() {
  console.log('pitch 3')
}