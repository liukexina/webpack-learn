const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 设置nodejs环境变量, 默认为生产环境，决定使用browserslist哪个环境
process.env.NODE_ENV = 'development';

module.exports = {
	// 单入口文件
	entry: './src/js/index.js',
	// 多入口：有一个入口，最终输出就有一个bundle
	// entry: {
	// 	index: './src/js/index.js',
	// 	test: './src/js/test.js'
	// },
	output: {
		// [name]: 取文件名
		filename: 'js/[name].[contenthash:10].js',
		path: resolve(__dirname, 'build'),
	},
	module: {
		rules: [
			{
				// 以下loader只会匹配一个
				// 注意：不能多个配置处理同一个类型的文件，需要提取出去，例如eslint-loader
				oneOf: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							// 预设：指示babel做怎么样的兼容性处理
							presets: [
								[
									'@babel/preset-env',
									{
										// 按需加载
										useBuiltIns: 'usage',
										// 指定core-js版本
										corejs: {
											version: 3,
										},
										// 指定兼容性做到哪个版本浏览器
										targets: {
											chrome: '60',
											firefox: '60',
											ie: '9',
											safari: '10',
											edge: '17',
										},
									},
								],
							],
							// 开启babel缓存
							// 第二次构建时会读取之前的缓存
							cacheDirectory: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			// filename: 'built.html',
			// 压缩html代码
			minify: {
				// 移除空格
				collapseWhitespace: true,
				// 移除注视
				removeComments: true,
			},
		}),
	],
	mode: 'production',
};
