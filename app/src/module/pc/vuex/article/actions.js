/**
 * Created on 2017/6/15.
 */

'use strict';

import { get, post, upload } from '@/common/require';
import api from '@pc/common/api';

export default {
  //保存文章
  saveArticle({commit}, params = {}){
    return upload({
      url: api.saveNews,
      data: params
    }).then(res => {
    });
  },
  //获取文章列表
  fetchArticleList({commit}, params = {}){
    return get({
      url: api.getNewsList,
      params: params
    }).then(res => {

      if (res.data && res.data.list.length !== 0) {
        res.data.category = params.category;
        commit('fetchArticleListSucc', res.data);

        //页码+1
        commit('pagePlus', params.category);
      }
      return res.data;
    });
  },
  //获取一篇文章
  fetchOneArticle ({commit}, params = {}) {
    return get({
      url: api.getOneNews,
      params: params
    }).then(res => {
      commit('fetchOneArticleSucc', res.data);
      return res.data;
    });
  },
  //删除一篇文章
  delOneArticle({commit}, params = {}){
    return post({
      url : api.delOneNews,
      data : {
        id : params.id
      }
    }).then(res => {
      commit('delOneArticleSucc', params.index);
    });
  }
};
