/**
 * Created on 2017/6/21.
 */

'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';     //路由

Vue.use(VueRouter);

import articleRouter from './article';
import musicRouter from './music';

let routes = [
  ...articleRouter,
  ...musicRouter
];

const router = new VueRouter({
  routes: routes
});

/**
 * 检测路由是否正确
 * @param to Route: 即将要进入的目标 路由对象
 * @param from  Route: 当前导航正要离开的路由
 * @param next  Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 * @returns {boolean}
 */
const checkRouterPath = (to, from, next) => {
  //判断是否存在路由 ， 不存在则跳转正确的路由
  if (!to.meta.isRouter) {
    next({path: '/all'});
    return false;
  }
  return true;
};

//全局路由导航钩子
router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  let scrollTop = to.meta.scrollTop;
  if (!title) {
    title = '首页';
  }

  //检测路由是否正确
  if (checkRouterPath(to, from, next) === false) {
    return;
  }

  if (scrollTop !== undefined) {
    document.body.scrollTop = scrollTop;
  }

  document.title = title;

  next();
});

export default router;
