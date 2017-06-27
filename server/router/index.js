/**
 * Created on 2017/6/15.
 */

'use strict'

const router = require('koa-router')()
const viewControl = require('../controller/views')
const newsControl = require('../controller/news')
const userControl = require('../controller/user')

//首页
router.get('/', viewControl.index)

//后台管理页面
router.get('/module/admin.html', viewControl.adminView)

//pc端页面
router.get('/module/pc.html', viewControl.pcView)


/**
 * 用户模块
 */

//用户注册
router.post('/userSignup', userControl.userSignup)
//用户登录
router.post('/userSignin', userControl.userSignin)
//用户退出登录
router.post('/userSignout', userControl.userSignout)

/**
 * 文章模块
 */

//保存文章
router.post('/saveNews', userControl.verifyLogin, userControl.verifyAuthority , newsControl.saveNews)

//获取文章列表
router.get('/getNewsList', newsControl.getNewsList)

//获取一篇文章
router.get('/getOneNews', newsControl.getOneNews)

//删除一篇文章
router.post('/delOneNews', userControl.verifyLogin, userControl.verifyAuthority , newsControl.delOneNews)

module.exports = router
