// loader本质上是一个函数
// 同步执行、异步执行, 推荐使用异步方式

/*
  content: 文件内容
  map: 文件sourcemap对应信息
  meta
*/
// 第一种同步方式
// module.exports = function(content, map, meta) {
//   console.log(111)
//   return content
// }

// 第二种同步方式
// module.exports = function(content, map, meta) {
//   console.log(111)

//   // 第一个参数代表有没有错误，没有错误返回null
//   this.callback(null, content, map, meta)
// }

// 异步执行
module.exports = function(content, map, meta) {
  console.log(111)
  const callback = this.async()
  setTimeout(() => {
    callback(null, content)
  }, 1000);
}

// pitch执行顺序和loader的执行顺序相反，切均在loader的执行方法前执行，代表解析
module.exports.pitch = function() {
  console.log('pitch 1')
}