const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
	devtool: 'source-map'

	/*
	source-map 一种提供源代码到构建后代码映射 技术，如果构建后代码出错了，通过追溯可以追溯到源代码错误
		[inline-|hidden-|eval-]nosources-][cheap-[module-]]source-map

		source-map:外部
			错误代码准确信息 和源代码的错误位置
		inline-source-map:内联
			只生成一个内联source-map
			错误代码准确信息和源代码的错误位置
		hidden-source-map:外部
			错误代码错误原因，但是没有错误位置
			不能追踪源代码错误，只能提示到构建后代码的错误位置
		eval-source-map:内联
			每一个文件都生成对应的source-map,都在eval
			错误代码准确信息和源代码的错误位置
		nosources-source-map:外部
			错误代码准确信息，但是没有任何源代码信息
		cheap-source-map:外部
			错误代码准确信息和源代码的错误位置
		cheap-module-source-map:外部
			错误代码准确信息和源代码的错误位置
			module会将loader的source-map加入


		开发环境:速度快，调试更友好
			速度快(eval>inline>cheap>...)
				eval-cheap-souce-map
				eval-source-map

			调试更友好
				souce-map
				cheap-module-souce-map
				cheap-souce-map

			--> eval-source-map / eval-cheap-module-souce-map
			浏览器/react/vue框架自动配置了eval-source-map

		生产环境:源代码要不要隐藏?调试要不要更友好
			内联会让代码体积变大，所以在生产环境不用内联
			源代码隐藏
				nosources-source-map全部隐藏
				hidden-source-map只隐藏源代码，会提示构建后代码错误信息

			调试友好
				source-map

			--> source-map / cheap-module-souce-map
	*/
};
