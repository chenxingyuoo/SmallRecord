/**
 * Created on 2017/7/23.
 */

'use strict';
import Vue from 'vue';
import directive from './src/directive';

Vue.use(directive);

export default {
  install(Vue) {
    Vue.use(directive);
  },
  directive
};

