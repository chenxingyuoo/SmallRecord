'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';     //路由

//views
import index from '@admin/views/index';

import articleRouter from './article';

Vue.use(VueRouter);

let indexRouter = {
  path: '/index',
  component: index
};

export default new VueRouter({
  routes: [
    indexRouter,
    ...articleRouter
  ]
});

