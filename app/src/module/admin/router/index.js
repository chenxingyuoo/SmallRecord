'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';     //路由

//views
import Index from '@admin/views/Index.vue';

import articleRouter from './article';

Vue.use(VueRouter);

let indexRouter = {
  path: '/index',
  component: Index,
  meta: { title : '欢迎'}
};

const router = new VueRouter({
  routes: [
    indexRouter,
    ...articleRouter
  ]
});

//全局路由导航钩子
router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  if (!title) {
    title = '后台管理系统';
  }
  document.title = title;

  next();
});

export default router;
