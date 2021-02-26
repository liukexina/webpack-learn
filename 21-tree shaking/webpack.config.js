const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 设置nodejs环境变量, 默认为生产环境，决定使用browserslist哪个环境
process.env.NODE_ENV = 'development';

/*
  tree shaking: 去除无用代码
		前提: 1.必须使用ES6模块化 2. 开启production环境
		作用:减少代码体积
		
		在package.json中配置
		"sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
		问题:
			可能会把 css / @babel/polyfill (副作用) 文件干掉
			sideEffects": ["*.css", "* .less"]

	按需导入 和 tree shaking的区别：
		按需导入: 需要什么引入什么
		tree shaking: 即使引入了但没用到就会被过滤
 */

const commonCssLoader = [
	MiniCssExtractPlugin.loader,
	'css-loader',
	{
		// 还需要在package.json中配置browserslist
		loader: 'postcss-loader',
		options: {
			postcssOptions: {
				plugins: [
					[
						'postcss-preset-env',
						{
							// options
						},
					],
				],
			},
		},
	},
];

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'js/built.[contenthash:10].js',
		path: resolve(__dirname, 'build'),
	},
	module: {
		rules: [
			/*
        正常来讲，一个文件只能被一个loader处理
        当一个文件要被多个loader处理，一定要指定loader执行的先后顺序
        先执行eslint 在执行babel
         */
			{
				// 在package.json中eslintConfig -->airbnb
				test: /\.js$/,
				exclude: /node_modules/,
				// 优先执行
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					fix: true, // 修复错误
				},
			},
			{
				// 以下loader只会匹配一个
				// 注意：不能多个配置处理同一个类型的文件，需要提取出去，例如eslint-loader
				oneOf: [
					{
						test: /\.css$/,
						use: [...commonCssLoader],
					},
					{
						test: /\.less$/,
						use: [...commonCssLoader, 'less-loader'],
					},
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
					{
						test: /\.(jpg|png|gif)$/,
						loader: 'url-loader',
						options: {
							limit: 8 * 1024,
							esModule: false,
							name: '[hash:10].[ext]',
							outputPath: 'imgs',
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
							outputPath: 'media',
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			// 对输出的css文件进行重命名
			filename: 'css/built.[contenthash:10].css',
		}),
		new OptimizeCssAssetsWebpackPlugin(),
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
	devtool: 'source-map'
};
