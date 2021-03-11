# webpack打包html

Loader： 下载、使用
plugins： 下载、引入、使用
Htmlwebpackplugin： 默认创建一个空的html，自动引入打包输出的所有资源（js/css)


webpack.config.js文件配置
```js
/*
  webpack.config.js  webpack的配置文件（src里面写项目代码，webpack写配置代码）
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）

    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
*/

// resolve用来拼接绝对路径的方法
const {
  resolve
} = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {},
  // plugins的配置
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件,需要添加一个template
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],
  mode: 'development', // 开发模式
}

/*
  执行的步骤：html(安装plugin:html-webpack-plugin)
    1. 根据entry找到入口文件'./src/index.js'
    2. 发现入口文件中引入了html文件，而html文件不是js或者json文件，去plugins数组中找到HtmlWebpackPlugin插件
    3. 复制template选项中的文件，
    4. 通过less-loader将less文件编译成css文件，自动引入打包输出的所有资源（JS/CSS）（JS文件通过script标签引入，CSS文件通过link标签引入）（不需要自己再引用了，否则重复引入会出问题的）
*/
```