'use strict';

import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';

Vue.use(Vuex);

//模块的状态管理
import global from './global/';
import article from './article/';
import sidebar from './sidebar/';

export default new Vuex.Store({
  modules: {
    global,
    article,
    sidebar
  },
  strict: process.env.NODE_ENV !== 'production',
  middlewares
});

