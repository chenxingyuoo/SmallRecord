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

export const categoryArticleRouter = [
  {
    path: '/all',
    name : '全部',
    component: indexView
  },
  {
    path: '/skating',
    name : '轮滑',
    component: indexView
  },
  {
    path: '/technology',
    name : '技术',
    component: indexView
  },
  {
    path: '/guitar',
    name : '吉他',
    component: indexView
  },
  {
    path: '/travel',
    name : '旅行',
    component: indexView
  },
  {
    path: '/life',
    name : '生活',
    component: indexView
  },
  {
    path: '/books',
    name : '书籍',
    component: indexView
  }
];

export default [
  ...categoryArticleRouter,
  {
    path: '/articleDetails/:id',
    component: createHomeView('ArticleDetails'),
    meta: { title : '文章详情', scrollTop : 0}
  }
];
