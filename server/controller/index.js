/**
 * Created on 2017/6/15.
 */

'use strict';

//首页
exports.index = async (ctx, next) => {
  // ctx.response.body = `<h1>Hello!</h1>`;
  ctx.render('index.html', {
    title: 'Welcome'
  });
};