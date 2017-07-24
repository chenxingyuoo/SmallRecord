/**
 * Created on 2017/6/3.
 */

'use strict';





const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
const staticFiles = (url, dir) => {
  return async (ctx, next) => {
    let requestPath = ctx.request.path;

    // 如果不是指定前缀的URL，继续处理下一个middleware:
    if (requestPath.startsWith(url) === false) {
      await next();
      return;
    }

    // 获取文件完整路径:
    let fp = path.join(dir, requestPath.substring(url.length));

    // 如果文件不存在:
    if (await fs.exists(fp) === false) {
      ctx.status = 404;
      return;
    }

    //文件后缀
    let ext = path.extname(fp);
    ext = ext ? ext.slice(1) : 'unknown';

    //文件信息
    let fileStat = await fs.statSync(fp);

    //设置文件类型
    ctx.response.set('Content-Type', mime.lookup(requestPath));
    ctx.response.set('Content-Length', fileStat.size);

    //最后修改时间
    let lastModified = fileStat.mtime.toUTCString();
    let ifModifiedSince = 'If-Modified-Since'.toLowerCase();

    //如果文件的后缀匹配，则缓存
    if (ext.match(/^(gif|png|jpg|jpeg|js|css)$/ig)) {
      //设置的文件的最后修改时间
      ctx.response.set('Last-Modified', lastModified);
    }

    //如果文件没有修改过 ， 返回304
    if (ctx.headers[ifModifiedSince] && lastModified === ctx.headers[ifModifiedSince]) {
      ctx.status = 304;
      return;
    }

    // 读取文件内容并赋值给response.body:
    ctx.response.body = await fs.readFile(fp);

  };
};

module.exports = staticFiles;
