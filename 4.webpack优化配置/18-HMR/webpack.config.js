const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
  hot module replacement 热模块替换/磨坏热替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
    极大提升构建速度
    1.样式文件：可以使用HMR，因为style-loader内部实现了
    2.js文件：默认不能使用HMR功能 ——> 修改js代码，添加支持HMR代码
      注意：HMR功能对js的处理，只能处理非入口文件
    3.html文件：默认不能使用HMR功能，html文件不能热更新
      解决：修改entry入口，将html文件引入
*/

module.exports = {
	target: process.env.NODE_ENV !== 'development' ? 'web' : 'browserslist',
	entry: ['./src/js/index.js','./src/index.html'],
	output: {
		filename: 'built.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
			{
				test: /\.(jpg|png|jpeg)$/,
				loader: 'url-loader',
				options: {
					limit: 8 * 1024,
					esModule: false,
					name: '[hash:10].[ext]',
					outputPath: 'img',
				},
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			},
			{
				exclude: /\.(css|js|html|jpg|png|jpeg|less)$/,
				loader: 'file-loader',
				options: {
					name: '[hash:10].[ext]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	mode: 'development',

	devServer: {
		// 项目构建后的路径
		contentBase: resolve(__dirname, 'build'),
		// 开启gzip压缩
		compress: true,
		// 端口号
		port: 8080,
		// 自动打开浏览器
    open: true,
    // 开启了热更新
    hot: true,
	},
};
