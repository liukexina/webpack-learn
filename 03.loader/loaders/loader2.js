// loader本质上是一个函数

/*
  content: 文件内容
  map: 文件sourcemap对应信息
  meta
*/

// 异步执行
module.exports = function(content, map, meta) {
  console.log(222)
  const callback = this.async()
  setTimeout(() => {
    callback(null, content)
  }, 1000);
}

module.exports.pitch = function() {
  console.log('pitch 2')
}