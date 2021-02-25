console.log('print.js文件被加载了～')

function print() {
  const content = 'hello world~'
  console.log(content)()
}

export default print;