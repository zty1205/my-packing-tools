const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
// const extractTextPlugin = require("extract-text-webpack-plugin") //用来抽离单独抽离css文件
const miniCssExtractPlugin = require("mini-css-extract-plugin") //用来抽离单独抽离css文件
const copyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require('webpack')
const devEnv = process.env.NODE_ENV !== 'production';

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index: ["@babel/polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js' // '[原文件名].js'
  },
  devtool: devEnv ? 'inline-cheap-source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/, // 正则匹配文件名
        exclude: '/node_modules/', // 排除 
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // use: ['style-loader', {
        //   loader: 'css-loader',
        //   options: {
        //     importLoaders: 1,
        //   }
        // }, 'postcss-loader']
        // use: extractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: ["css-loader", 'postcss-loader']
        // })
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
              limit: 8192, // 8kb 小于8kb 的图片将被打成base64
              name: '[name].[hash:8].[ext]',
              outputPath: "img" // ==>'/img/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [ // 插件
    // new extractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new cleanWebpackPlugin(), // 删除文件 保留新文件
    new copyWebpackPlugin([{
      from: path.resolve(__dirname, 'public/static'), 
      to: path.resolve(__dirname, 'dist'),
      ignore: ['index.html']
    }]),
    new miniCssExtractPlugin({ // 插件暂时不支持HMR
　　  filename: devEnv ? 'css/[name].css' : 'css/[name].[hash].css',
　　  chunkFilename: devEnv ? 'css/[id].css' : 'css/[id].[hash].css',
　　 }),
    new htmlWebpackPlugin({ // 
      filename: 'index.html',
      template: './public/index.html', // html文件模板
      inject: 'body', // js 放在body下面
      chunks: ['index'], // 引入js文件 与入口一致，默认为all 引入所有
      minify: {
        collapseWhitespace: true,  //折叠空白区域 也就是压缩代码
        removeComments: true, //移除HTML中的注释
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8088,
    host: 'localhost',
    overlay: true, // 浏览器会显示编译错误
    inline: true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
    hot: true
  }
}