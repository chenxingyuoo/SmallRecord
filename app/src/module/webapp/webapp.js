/**
 * Created by chenxingyu on 2017/3/30.
 */

import '@/assets/scss/common.scss';
import 'mavon-editor/dist/css/index.css';

import '@/common/rem';
import '@/common/reqAnimFrame';

import Vue from 'vue';
import App from './App.vue';
import { sync } from 'vuex-router-sync';
import store from '../pc/vuex/';       //状态管理
import router from './router';     //路由
import { timeToNow } from '@/common/filters';

sync(store, router);

//自定义过滤器
Vue.filter('timeToNow', timeToNow);

//plugins
import '@/common/plugins/swiper';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
