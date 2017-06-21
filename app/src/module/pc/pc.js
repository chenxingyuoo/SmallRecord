'use strict';
//css
import '@/assets/scss/common.scss';
import 'mavon-editor/dist/css/index.css';


import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App';
//引用element-ui , 自己修改过的
import store from './vuex/';       //状态管理
import router from './router';     //路由

import { timeToNow, transTab} from '@/common/filters';

sync(store, router);

//自定义过滤器
Vue.filter('timeToNow', timeToNow);
Vue.filter('transTab', transTab);


//plugins
import '@/common/plugins/swiper';
import '@/common/plugins/particles';

import '@/common/reqAnimFrame';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
