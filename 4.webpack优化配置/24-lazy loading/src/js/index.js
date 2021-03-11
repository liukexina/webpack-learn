// import { mul } from './test';

console.log('index.js文件被加载了～')

// console.log(mul(1,4))


document.querySelector('#btn').onclick = function() {
  /*
    懒加载~:当文件需要使用时才加载~
    预加载prefetch: 会在使用之前，提前加载js文件
    正常加载可以认为是并行加载(同一时间加载多个文件)
    预加载prefetch: 等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  */

   /*
    1. 通常情况下懒加载的第一次加载如果加载的文件比较大的话会加载的时间比较长，给用户造成阻塞的现象
    2. 一般不使用预加载，因为兼容性差了一些，一般使用懒加载
    3. 懒加载的实现是基于前面的代码分割的基础上的，要进行了前面的代码分割的配置才可以使用懒加载，这个案例实现的功能是点击按钮之后再加载test文件中的js代码
    4. 懒加载第一次可能会慢一点，第二次加载便不会慢了，第一次加载会存入缓存中，第二次加载会直接从缓存中加载
  */
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test')
    .then(({mul, del}) => {
      console.log(mul(1,4))
    }).catch()
}
