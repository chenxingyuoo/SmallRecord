'use strict';

import { post } from '@admin/common/require';
import api from '@admin/common/api';
import {localStore} from '@/common/storage';

//刷新路由视图
const reloadRouterView = (commit) => {
  commit('setRouterViewShow', false);
  setTimeout(() => {
    commit('setRouterViewShow', true);
  },5);
};

export default {
  //登录
  loginByPass({commit}, params = {}){
    return post({
      url: api.userSignin,
      data: params
    }).then(res => {
      //刷新路由视图
      reloadRouterView(commit);
       //设置用户信息
      commit('setUserInfo', res.data);
      return res;
    });
  },
  //退出登录
  logoutById({commit}, params = {}){
    return post({
      url: api.userSignout,
      data: params
    }).then(res => {
      //刷新路由视图
      reloadRouterView(commit);
      //清除本地数据
      localStore.remove('userInfo');
      //清空用户信息
      commit('setUserInfo', {});

    });
  }
};
