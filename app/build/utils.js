var path = require('path')
var glob = require('glob')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}


//判断是否是入口文件
const isEnter = function (src){
  const notEnters = config.entry.ignoreFolder;

  if (Array.isArray(notEnters) === false) {
    console.error('请确保 entry ignoreFolder 为数组');
    return;
  }

  for (var i = 0, len = notEnters.length; i < len; i++) {
    var notEnter = src.match(new RegExp(notEnters[i] + '\\/'));
    if (notEnter) {
      return false;
    }
  }

  return true;
};

//获取入口文件 ， 配置多页应用
exports.getEntry = function (globPath){
    var entries = {},
        basename, tmp, pathname;

    if (typeof globPath !== 'string') {
      console.error('请确保 globPath 为字符串');
      return;
    }

    glob.sync(globPath).forEach(function (entry) {

      //判断是不是入口文件 ，因为指定文件夹可以忽略
      if (isEnter(entry)) {
        basename = path.basename(entry, path.extname(entry));

        tmp = entry.split('/').splice(-3);

        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径

        entries[pathname] = entry;
      }

    });

    return entries;
}
