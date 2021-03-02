import '../css/index.less';
import '../fonts/iconfont.css';
import print from './print.js'

console.log('index.js文件被加载了～')

print()

function add(x,y) {
  return x+y
}
console.log(add(1,3))


if(module.hot) {
  // 一旦module.hot为ture, 说明开启了HMR功能，让HMR代码生效
  module.hot.accept('./print.js', function() {
    // 方法会监听print.js文件的变化，一旦发生变化，其他默认不会重新打包构建
    // 会执行后面的回调函数
    print();
  })
}