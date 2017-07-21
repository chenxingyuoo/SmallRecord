/**
 * Created on 2017/6/15.
 */

'use strict';

import ArticleView from '@webapp/views/article/ArticleView.vue';

//异步加载路由组件 ， 创建页面
const createHomeView = (name) => {
  return (resolve) => {
    return require(['@webapp/views/article/' + name + '.vue'], resolve);
  };
};

const createArticleView = (category) => {
  return {
    name: `${category}`,
    render (createElement) {
      return createElement(ArticleView, {props: {category}});
    }
  };
};


let meta = {
  title: '首页',
  isRouter: true
};

const categoryArticleRouters = [
  {
    path: '/all',
    name: '全部',
    component: createArticleView('all'),
    meta: meta
  },
  {
    path: '/technology',
    name: '技术',
    component: createArticleView('technology'),
    meta: meta
  },
  {
    path: '/skating',
    name: '轮滑',
    component: createArticleView('skating'),
    meta: meta
  },
  {
    path: '/guitar',
    name: '吉他',
    component: createArticleView('guitar'),
    meta: meta
  },
  {
    path: '/travel',
    name: '旅行',
    component: createArticleView('travel'),
    meta: meta
  },
  {
    path: '/life',
    name: '生活',
    component: createArticleView('life'),
    meta: meta
  },
  {
    path: '/books',
    name: '书籍',
    component: createArticleView('books'),
    meta: meta
  }
];

export default  [
  ...categoryArticleRouters,
  {
    path: '/articleDetails/:id',
    component: createHomeView('ArticleDetails'),
    meta: {title: '文章详情', scrollTop: 0, isRouter: true}
  }
];
