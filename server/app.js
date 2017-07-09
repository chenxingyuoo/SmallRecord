/**
 * Created on 2017/6/2.
 */

'use strict'

const path = require('path')
const Koa = require('koa')
const logger = require('koa-logger')
// const session = require("koa-session2")
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
// const proxy = require('http-proxy-middleware')
//log工具
const logUtil = require('./utils/log_util')

// 导入controller middleware:
const staticFiles = require('./middleware/static-files')
const templating = require('./middleware/templating')

const isProduction = process.env.NODE_ENV === 'production'

// 创建一个Koa对象表示web app本身:
const app = new Koa()

app.use(logger())

//koaBody 要在 bodyParser 上面
app.use(koaBody({multipart: true}))

app.use(bodyParser())

app.use(staticFiles('/dist/', path.join(__dirname , '../app/dist')))
app.use(staticFiles('/static/', path.join(__dirname , '../app/dist/static')))
app.use(staticFiles('/public/', __dirname + '/public'))

app.use(templating('../app/dist/module/', {
    noCache: !isProduction,
    watch: !isProduction
}))


//允许跨域
app.use(async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:3050')
  ctx.response.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
  ctx.response.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  await next()
})


// logger
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date()
  //响应间隔时间
  let execTime
  try {
    //开始进入到下一个中间件
    await next()

    execTime = new Date() - start

    ctx.response.set('X-Response-Time', `${execTime}ms`)

    //记录响应日志
    logUtil.logResponse(ctx, `${execTime}ms`)

  } catch (error) {

    execTime = new Date() - start

    //记录异常日志
    logUtil.logError(ctx, error, `${execTime}ms`)
  }
})


// app.use(session({
//   key: "SESSIONID",   //default "koa:sess"
//   maxAge: 500000      //设置session超时时间
// }))

const router = require('./router')
//添加路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err)
})

//启动服务 ， 监听文件自动刷新
// const bs = require('browser-sync').create()
const port = 3000
app.listen(port, (argument) => {
  // body...
  // bs.init({
  //   open: false,
  //   ui: false,
  //   notify: false,
  //   proxy: `localhost:${port}`,
  //   files: ['../app'],
  //   port: 8000
  // })
  console.log(`http://localhost:${port}`)
})

