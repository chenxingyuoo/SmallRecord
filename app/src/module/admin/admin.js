'use strict';
//css
import '@/assets/scss/common.scss';

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import store from './vuex/';       //状态管理
import router from './router';     //路由

import { timeToNow, transTab} from '@/common/filters';

sync(store, router);

//自定义过滤器
Vue.filter('timeToNow', timeToNow);

import '@/common/plugins/elementUi';
import '@/common/plugins/mavonEditor';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
