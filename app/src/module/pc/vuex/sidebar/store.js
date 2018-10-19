/**
 * Created on 2017/7/10.
 */

'use strict';

export default {
  state : {
    isSidebarOpen : false,
    sidebarWidth : ''
  },
  actions : {

  },
  getters : {

  },
  mutations : {
    //设置侧边栏是否可见
    setSidebarVisible(state, isShow){
      state.isSidebarOpen = isShow;
    }
  }
};
