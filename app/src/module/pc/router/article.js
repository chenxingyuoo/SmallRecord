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

const indexView = createHomeView('Index');

let meta = {
  isRouter : true
};

export const categoryArticleRouters = [
  {
    path: '/all',
    name : '全部',
    component: indexView,
    meta : meta
  },
  {
    path: '/technology',
    name : '技术',
    component: indexView,
    meta : meta
  },
  {
    path: '/skating',
    name : '轮滑',
    component: indexView,
    meta : meta
  },
  {
    path: '/guitar',
    name : '吉他',
    component: indexView,
    meta : meta
  },
  {
    path: '/travel',
    name : '旅行',
    component: indexView,
    meta : meta
  },
  {
    path: '/life',
    name : '生活',
    component: indexView,
    meta : meta
  },
  {
    path: '/books',
    name : '书籍',
    component: indexView,
    meta : meta
  }
];

export default [
  ...categoryArticleRouters,
  {
    path: '/articleDetails/:id',
    component: createHomeView('ArticleDetails'),
    meta: { title : '文章详情', scrollTop : 0, isRouter : true}
  }
];
