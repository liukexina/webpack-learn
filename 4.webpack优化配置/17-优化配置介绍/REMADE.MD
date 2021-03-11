# webpack 性能优化

* 开发环境性能优化
* 生产环境性能优化

## 开发环境性能优化
* 优化打包构建速度
 * HMR  
 热模块替换
* 优化代码调试  
 * source-map

## 生产环境性能优化
* 优化打包构建速度
 * oneOf
 * babel缓存
 * 多进程打包
 * externals   
 拒绝某个库打包，而使用cdn
 * dll        
 针对某些库单独打包
* 优化代码运行的性能
 * 缓存（hash-chunkhash-contenthash)
 * tree shaking    
 去除无用代码
 * code split
 代码分割
 * 懒加载/预加载
 * pwa
 离线加载
