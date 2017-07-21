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
      let _data = res.data;
      if (_data.list.length !== 0) {
        //获取文章列表成功
        commit('fetchArticleListSucc', _data);
        //页码+1
        commit('pagePlus');
      }

      //没有更多数据
      if (_data.list.length === 0 || params.page === _data.totalPage) {
        commit('noMore');
      }

      return _data;
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
      url: api.delOneNews,
      data: {
        id: params.id
      }
    }).then(res => {
      commit('delOneArticleSucc', params.index);
    });
  }
};
