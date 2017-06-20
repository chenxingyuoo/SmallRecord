var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var glob = require('glob')
var config = require('../config');
var isDebug = process.env.NODE_ENV === 'development';
var outputPath = resolve('static/js/lib/') ;
var fileName = '[name].js';

var utils = require('./utils');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

//获取静态资源包
function getLibEntrys(libSrc){
  var libEntries = {};

  glob.sync(libSrc).forEach(function (entry) {

    var result = JSON.parse(fs.readFileSync(entry));

    var name = entry.substring(entry.indexOf('module') + 7, entry.lastIndexOf('/'))

    var pathname = name + '/lib';

    libEntries[pathname] = result;
  })

  console.log(libEntries);
  return libEntries;
}


//插件
var plugin = [];

//静态资源包 , 预编译
var libEntrys = getLibEntrys('./src/module/**/lib.json')

//按文件添加 DllPlugin 插件
Object.keys(libEntrys).forEach(function (name){
  //文件名
  var folderName = name.substring(0, name.lastIndexOf('/'))

  //json输出位置
  var manifestOutput = './static/js/lib/' + folderName

  plugin.push(
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(manifestOutput, 'manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name: '[name]',
      context: __dirname
    })
  );
});


if (!isDebug) {
  plugin.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$', 'exports', 'require']
      },
      compress: {warnings: false},
      output: {comments: false}
    })
  )
}

module.exports = {
  devtool: '#source-map',
  entry: libEntrys,
  output: {
    path: outputPath,
    filename: fileName,
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: plugin
};
