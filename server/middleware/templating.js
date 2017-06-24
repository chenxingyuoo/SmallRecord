/**
 * Created on 2017/6/3.
 */

'use strict';

const nunjucks = require('nunjucks');

function templating(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false;

    nunjucks.configure(path, {
        autoescape: autoescape,
        noCache : noCache,
        watch : watch,
        throwOnUndefined : throwOnUndefined
    });

    // 创建Nunjucks的env对象:
    return async (ctx, next) => {
        // 给ctx绑定render函数:
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body:
            ctx.response.body = nunjucks.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type:
            ctx.response.type = 'text/html';
        };
        // 继续处理请求:
        await next();
    };
}

module.exports = templating;