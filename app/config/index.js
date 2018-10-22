// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  entry : {
    jsEntrySrc : './src/module/**/*.js',      //js入口文件正则匹配
    htmlEntrySrc : './src/module/**/*.html',  //html入口文件正则匹配
    ignoreFolder : ['vuex' , 'router', 'components', 'common', 'views']        //忽略文件夹不作为入口
  },
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3050,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api' : {
        // target: 'http://47.106.80.164',
        target: 'http://localhost:3000',
        logLevel: 'debug',
        changeOrigin: true,
        pathRewrite: {

        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
