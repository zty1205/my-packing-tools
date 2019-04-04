module.exports = {
  plugins: [
    require('postcss-url')(),
    require('postcss-import')(),
    require('cssnano')()
  ]
}