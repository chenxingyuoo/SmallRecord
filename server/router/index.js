/**
 * Created on 2017/6/15.
 */

'use strict';

const router = require('koa-router')();


const controlIndex = require('../controller/index');
const controlNews = require('../controller/news');


router.get('/', controlIndex.index);

//保存文章
router.post('/saveNews', controlNews.saveNews);

//获取文章列表
router.get('/getNewsList', controlNews.getNewsList);

//获取一篇文章
router.get('/getOneNews', controlNews.getOneNews);

//删除一篇文章
router.post('/delOneNews', controlNews.delOneNews);


module.exports = router;
