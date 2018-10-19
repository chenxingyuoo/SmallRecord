/**
 * Created by chenxingyu on 2017/3/30.
 */
import '@/assets/scss/common.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './router';


import 'element-ui/lib/theme-default/index.css';
import { Button, Form,FormItem, Input } from 'element-ui';
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);

//plugins
import '@/common/plugins/particles';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
