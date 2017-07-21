/**
 * Created on 2017/6/15.
 */

'use strict';

//异步加载路由组件 ， 创建页面
const createHomeView = (name) => {
  return (resolve) => {
    return require(['@webapp/views/music/' + name + '.vue'], resolve);
  };
};

export default [
  {
    path: '/music',
    component: createHomeView('Index'),
    meta: {title: '音乐', scrollTop: 0, isRouter: true}
  }
];
