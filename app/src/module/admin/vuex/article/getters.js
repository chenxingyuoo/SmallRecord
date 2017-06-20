/**
 * Created on 2017/6/15.
 */

'use strict';

export default {
  //获取文章对象
  getArticle(state){
    return state.article;
  },
  //获取当前文章
  getOneArticle(state){
    return state.oneArticle;
  }
};
