/**
 * Created on 2017/6/21.
 */

'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';     //路由

Vue.use(VueRouter);


import articleRouter from '@pc/router/article';
import musicRouter from '@pc/router/music';

const router = new VueRouter({
  routes: [
    ...articleRouter,
    ...musicRouter
  ]
});

//全局路由导航钩子
router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  let scrollTop = to.meta.scrollTop;
  if (!title) {
    title = '首页';
  }

  if (scrollTop !== undefined) {
    document.body.scrollTop = scrollTop;
  }

  document.title = title;

  next();
});


export default router;
