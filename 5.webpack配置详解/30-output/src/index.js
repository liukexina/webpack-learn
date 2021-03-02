// import add from './add.js'
import del from './del.js'

console.log('index.js文件被加载了～')


import('./add').then(({default: add}) => {
  console.log(add(1,2))
})
console.log(del(8,2))