'use strict';

import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';

Vue.use(Vuex);

//模块的状态管理
import global from './global/';
import article from './article/';

export default new Vuex.Store({
  modules: {
    global,
    article
  },
  strict: process.env.NODE_ENV !== 'production',
  middlewares
});

