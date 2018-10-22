/**
 * Created on 2017/6/28.
 */

'use strict';

let apis = {
  //文章模块
  getOneNews : 'getOneNews', //获取一篇文章
  getNewsList : 'getNewsList' //获取文章列表
};

for (let key in apis){
  apis[key] = '/api/' + apis[key];
}

export default apis;
