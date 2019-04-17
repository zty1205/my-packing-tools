const path = require('path')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const miniCssExtractPlugin = require("mini-css-extract-plugin") //用来抽离单独抽离css文件
const copyWebpackPlugin = require("copy-webpack-plugin")
const htmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index: ["./src/index.js"],
    main: ["./src/main/main.js"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js' // '[原文件名].js'
    // filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 正则匹配文件名
        exclude: '/node_modules/', // 排除 
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20 * 1024, // 20kb 小于20kb 的图片将被打成base64
              name: '[name].[hash:8].[ext]',
              outputPath: "img" // ==>'/img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2 * 1024, // 20kb 小于20kb 的图片将被打成base64
              name: '[name].[ext]',
              outputPath: "img" // ==>'/img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          attrs: ['img:src', 'link:href']
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [ // 插件
    new cleanWebpackPlugin(), // 删除文件 保留新文件
    new copyWebpackPlugin([{
      from: path.resolve(__dirname, 'public/static'), 
      to: path.resolve(__dirname, 'dist'),
      ignore: ['index.html']
    }]),
    new miniCssExtractPlugin({ // 插件暂时不支持HMR
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[id].[hash:8].css'
    }),
    new htmlWebpackPlugin({ // html模板插件
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
      filename: 'index.html',
      template: './public/index.html', // html文件模板
      inject: 'body', // js 放在body下面
      chunks: ['index', 'main'], // 引入js文件 与入口一致，默认为all 引入所有
      minify: {
        collapseWhitespace: true,  //折叠空白区域 也就是压缩代码
        removeComments: true, //移除HTML中的注释
      }
    })
  ]
}