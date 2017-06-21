/**
 * Created on 2017/6/15.
 */

'use strict';

export default {
  //获取文章列表成功
  fetchArticleListSucc(state, data = {}){
    let articleData = state.article.data;
    if (!articleData.list) {
      state.article.data = data;
      return;
    }

    //往数据添加数据
    for (let key in articleData) {
      if (key !== 'list') {
        state.article.data[key] = data[key];
      } else {
        state.article.data.list.push(...data.list);
      }
    }
  },
  //页面 +1
  pagePlus(state){
    state.article.currPage++;
  },
  //获取一篇文章成功
  fetchOneArticleSucc(state, data = {}){
    state.oneArticle = data;
  },
  //删除一篇文章成功
  delOneArticleSucc(state, index){
    state.article.data.list.splice(index, 1);
  }
};
