/**
 * Created on 2017/6/25.
 */

'use strict';

//首页
exports.index = async (ctx, next) => {
  ctx.render('base.html', {
    title: 'Welcome'
  });
};

//后台管理系统页面
exports.adminView =  async (ctx, next) => {
  ctx.render('admin.html', {
    title: 'Welcome'
  });
};

//后台管理系统页面
exports.pcView =  async (ctx, next) => {
  ctx.render('pc.html', {
    title: 'Welcome'
  });
};