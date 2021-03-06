const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer');

// 设置nodejs环境变量, 默认为生产环境
// process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
    publicPath:'./'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',

          /* 
            "browserslist": {
              // 开发环境 -> 设置环境变量：process.env.NODE_ENV = 'development'
              "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境，默认是生产环境
              "production" : [
                ">0.2%",
                "not dead",
                "not op_mini all"
              ]
            },
          */

          // 使用loader的默认设置
          // 'postcss-loader'
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                //或者将插件引入写在单独的配置js中
                //config: './config/postcss.config.js',
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // options
                    }
                  ],
                  // autoprefixer(['IE 10'])
                ]
            }
            // 老版本：
              // ident: 'postcss',
              // plugins: () => [
              //   // postcss的插件
              //   require('postcss-preset-env')()
              // ]
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[hash:10].[ext]',
          outputPath: 'img'
        }
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
          outputPath: 'fonts'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'built.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      // filename: 'css/built.css'
    })
  ],
  mode: 'development'
}