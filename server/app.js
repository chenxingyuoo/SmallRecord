/**
 * Created on 2017/6/2.
 */

'use strict';

const Koa = require('koa');
const logger = require('koa-logger')
// const body = require('koa-better-body')

const bodyParser = require('koa-bodyparser');

// const multer = require('koa-multer');

const koaBody = require('koa-body');


// 导入controller middleware:

const staticFiles = require('./middleware/static-files');

const templating = require('./middleware/templating');

const isProduction = process.env.NODE_ENV === 'production';

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(logger())

app.use(koaBody({multipart: true}));

// app.use(multer({ dest: './uploads/'}));

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    let start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//允许跨域
app.use(async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:3050')
  ctx.response.set('Access-Control-Allow-Headers', 'X-Requested-With')
  ctx.response.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  await next();
})

app.use(bodyParser());

app.use(staticFiles('/static/', __dirname + '/static'));
app.use(staticFiles('/public/', __dirname + '/public'));

app.use(templating('../app/', {
    noCache: !isProduction,
    watch: !isProduction
}));

const router = require('./router');
//添加路由中间件
app.use(router.routes());
app.use(router.allowedMethods());


app.on('error', (err, ctx) => {
  console.error('server error', err);
});

//启动服务 ， 监听文件自动刷新
const bs = require('browser-sync').create();
const port = 3000;
app.listen(port, (argument) => {
  // body...
  bs.init({
    open: false,
    ui: false,
    notify: false,
    proxy: `localhost:${port}`,
    files: ['../app'],
    port: 8000
  });

  console.log(`http://localhost:${port}`);
});

// app.listen(port);
// console.log(`app started alst port ${port}...`);