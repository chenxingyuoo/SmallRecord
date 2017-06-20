/**
 * Created on 2017/6/20.
 */

'use strict';

//异步加载路由组件 ， 创建页面
const createAdminView = (name) => {
  return (resolve) => {
    return require(['@admin/views/article/' + name + '.vue'], resolve);
  };
};

export default [
  {
    path: '/createdArticle',
    component: createAdminView('CreatedArticle')
  },
  {
    path: '/articleList',
    component: createAdminView('ArticleList')
  }
];
