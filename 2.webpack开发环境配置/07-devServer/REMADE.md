# devServer

自动化（自动编辑、自动打开浏览器、自动刷新浏览器）    
特点：只会在内容中编译打包，不会有任何输出  
启动devServer指令： npx webpack serve

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
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // 要安装 webpack-dev-server（因为是本地安装，所以需要使用npx webpack-dev-server启动，webpack我们使用的全局安装，所以启动的时候不需要使用npx）
  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：webpack server
  devServer: {
    // 项目构建后的路径
    contentBase: resolve(__dirname, 'build'),
    // 开启gzip压缩
    compress: true,
    // 端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
  }
  mode: 'development', // 开发模式
}

/*
  执行的步骤：打包图片资源（安装loader:url-loader file-loader html-loader）
    1. 根据entry找到入口文件'./src/index.js'
    2. 发现入口文件中引入了jpg|png|gif文件，而jpg|png|gif文件不是js或者json文件，去找module的rules里面寻找jpg|png|gif的loader
    3. 找到test: /\jpg|png|gifs$/，执行该对象中的rules数组中的代码
    4. 通过options-->limit对体积进行限制
    5. 这种方式只能处理样式中引入的图片，不能处理html中引入的图片，如果要处理htnl中引入的资源，需要使用html-loader
    6. 处理html中引入的图片需要找到test: /\jpg|png|gifs$/，执行里面的html-loader
    7. 但是解析时图片的名称会出现[object Module]问题，这是因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，使用esModule: false关闭url-loader的es6模块化，使用commonjs解析即可
    8. 使用name: '[hash:10].[ext]'给图片进行重命名
*/
```