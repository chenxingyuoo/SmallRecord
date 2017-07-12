/**
 * Created on 2017/6/15.
 */

'use strict';

export default {
  //获取文章列表成功
  fetchArticleListSucc(state, data = {}){
    let category = data.category;
    let currCategoryObj = state.article[category];
    let currCategoryData = currCategoryObj.data;
    if (!currCategoryData.list) {
      state.article[category].data = data;
      return;
    }

    //添加数据
    for (let key in state.article[category].data){
      if (key !== 'list') {
        state.article[category].data[key] = data[key];
      } else {
        state.article[category].data.list.push(...data.list);
      }
    }
  },

  //获取文章列表初始化
  fetchArticleListInit(state, category){
    state.article[category].currPage = 1;
  },

  //没有更多数据
  noMore(state, category){
    state.article[category].isLoadMore = false;
    if (state.article[category].currPage > 1) {
      state.article[category].isNotDate = true;
    }
  },

  setScrollTop(state,params){
    state.article[params.category].scrollTop = params.scrollTop;
  },

  //页面 +1
  pagePlus(state, category){
    state.article[category].currPage++;
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
