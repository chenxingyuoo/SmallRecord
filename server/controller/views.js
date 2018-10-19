/**
 * Created on 2017/6/25.
 */

'use strict';


const utils = require('../utils/index');

//首页
exports.index = async (ctx, next) => {
  let userAgent = ctx.header['user-agent'];
  if (utils.isPc(userAgent) === true) {
    ctx.redirect('/module/pc.html');
  } else{
    ctx.redirect('/module/webapp.html');
  }
};

//注册登录页
exports.base = async (ctx, next) => {
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

//pc首页
exports.pcView =  async (ctx, next) => {
  ctx.render('pc.html', {
    title: 'Welcome'
  });
};

//webapp首页
exports.webappView = async (ctx, next) => {
  ctx.render('webapp.html', {
    title: 'Welcome'
  });
};