const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8088,
    host: 'localhost',
    overlay: true, // 浏览器会显示编译错误
    inline: true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
    hot: true
  }
});