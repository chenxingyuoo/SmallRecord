/**
 * Created on 2017/6/15.
 */

'use strict';

export default {
  //获取文章列表成功
  fetchArticleListSucc(state, data = {}){
    state.article.data = data;
  },
  //获取一篇文章成功
  fetchOneArticleSucc(state, data = {}){
    state.oneArticle = data;
  },
  //删除一篇文章成功
  delOneArticleSucc(state, index){
    state.article.data.list.splice(index, 1);
  },
  //设置页码
  setPage(state, page = 1){
    state.article.currPage = page;
  }
};
