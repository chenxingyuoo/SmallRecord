/**
 * Created by chenxingyu on 2017/5/10.
 */

export default {
  //设置用户信息
  setUserInfo(state, data) {
    state.userInfo = data;
  },

  //显示登录
  showLogin(state){
    state.isShowLogin = true;
  },
  //隐藏登录
  hideLogin(state){
    state.isShowLogin = false;
  },
  //重新加载路由视图
  setRouterViewShow(state, isShow = true){
    state.isShowRouterView = isShow;
  },

  //显示隐藏状态1
  setVisibleOne(state, isShow = false) {
    state.visibleOne = isShow;
  },
  //显示隐藏状态2
  setVisibleTwo(state, isShow = false) {
    state.visibleTwo = isShow;
  }
};
