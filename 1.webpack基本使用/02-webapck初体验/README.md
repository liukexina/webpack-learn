# webpack初体验

## 运行指令

1. 开发环境指令：webpack src/js/index.js -o build/js/built.js --mode=development

功能：webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成 浏览器能识别的语法。

2. 生产环境指令：webpack src/js/index.js -o build/js/built.js --mode=production 

功能：在开发配置功能上多一个功能，压缩代码。 


## 结论

1. webpack 能够编译打包 js 和 json 文件
2. 能将 es6 的模块化语法转换成浏览器能识别的语法
3. 能压缩代码。
4. 不能编译打包 css、img 等文件
5. 不能将 js 的 es6 基本语法转化为 es5 以下语法