/**
 * Created on 2017/6/15.
 */

'use strict';

//异步加载路由组件 ， 创建页面
const createHomeView = (name) => {
  return (resolve) => {
    return require(['@pc/views/article/' + name + '.vue'], resolve);
  };
};

export default [
  {
    path: '/',
    component: createHomeView('Index'),
    meta: {
      title : '首页'
    }
  },
  {
    path: '/articleDetails/:id',
    component: createHomeView('ArticleDetails'),
    meta: { title : '文章详情', scrollTop : 0}
  }
];
