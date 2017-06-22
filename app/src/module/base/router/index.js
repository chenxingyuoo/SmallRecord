/**
 * Created on 2017/6/21.
 */

'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';     //路由

Vue.use(VueRouter);


//异步加载路由组件 ， 创建页面
const createView = (name) => {
  return (resolve) => {
    return require(['@base/views/' + name + '.vue'], resolve);
  };
};

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: createView('Login'),
      meta: { title : '登录'}
    },
    {
      path: '/register',
      component: createView('Register'),
      meta: { title : '注册'}
    }
  ]
});

//全局路由导航钩子
router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  if (!title) {
    title = '首页';
  }

  document.title = title;
  next();
});


export default router;
