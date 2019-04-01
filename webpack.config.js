const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: ["@babel/polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' // '[原文件名].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 正则匹配文件名
        exclude: '/node_modules/', // 排除 
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        }, 'postcss-loader']
      },
      {
        test:/\.(sass|scss)$/,
        use:['style-loader','css-loader','sass-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192 // 8kb 小于8kb 的图片将被打成base64
            }
          }
        ]
      }
    ]
  },
  plugins: [ // 插件
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
  ]
}