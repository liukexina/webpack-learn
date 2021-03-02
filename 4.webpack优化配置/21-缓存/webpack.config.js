const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 设置nodejs环境变量, 默认为生产环境，决定使用browserslist哪个环境
process.env.NODE_ENV = 'development';

/*
  缓存:
    babel缓存
      cacheDirectory: true
      -->让第二次打包构建速度更快
    文件资源缓存
      hash:每次wepack 构建时会生成一个唯一 的hash值 。
        问题:因为js和css同时使用一个hash值。
        如果重新打包，会导致所有缓存失效。(可 能我却只改动一个文件) 
      chunkhash:根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题: js和css的hash值还是一样的
        因为css是在js中被引入的，所以同属于一-个chunk
      contenthash:根据文件的内容生成hash值。不同文件hash值一定不一样

      -->让代码上线运行缓存更好使用
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
};
