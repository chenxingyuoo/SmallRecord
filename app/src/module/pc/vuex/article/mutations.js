/**
 * Created on 2017/6/15.
 */

'use strict';

export default {
  //设置当前选中的分类
  setActiveCategory(state, category = ''){
    state.activeCategory = category;
  },

  //获取文章列表成功
  fetchArticleListSucc(state, data = {}){
    let category = state.activeCategory;
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
  fetchArticleListInit(state){
    state.article[state.activeCategory].currPage = 1;
  },

  //没有更多数据
  noMore(state){
    let category = state.activeCategory;
    state.article[category].isLoadMore = false;
    if (state.article[category].currPage > 1) {
      state.article[category].isNotDate = true;
    }
  },

  //保存滚动距离
  setScrollTop(state, scrollTop){
    state.article[state.activeCategory].scrollTop = scrollTop;
  },

  //页面 +1
  pagePlus(state){
    state.article[state.activeCategory].currPage++;
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
