# vue-admin

> vue 后台管理系统脚手架

## 构建安装程序

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3030
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 多页配置文件说明

![](https://github.com/chenxingyuoo/markdown-image/blob/master/vue-admin/config.jpeg?raw=true)

config
  | -- index.js   entry对象作为入口配置

## 文件目录说明

![](https://github.com/chenxingyuoo/markdown-image/blob/master/vue-admin/build.jpeg?raw=true)

<pre>
assets --- 静态资源文件
common --- 公用js
  | -- api.js               #接口管理
  | -- filters.js           #过滤器，可单独使用也可配合vue模板使用
  | -- require.js           #网络请求封装
components --- 公用组件
  | -- element-ui           #element-ui组件,修改过的
module --- 多页的模块
  | --  index  #index页面
  | --  manage #manage页面
          | --  components  #manage 的私有组件
          | --  router      #单页应用配置路由
          | --  views       #路由对应的视图组件
          | --  vuex        #状态管理
</pre>

>module 下面的每个页面都可以配置 router vuex


## 框架资料

#vue :
https://vuefe.cn/v2/guide/

#vue-router
https://router.vuejs.org/zh-cn/

#vuex : 状态管理
https://vuex.vuejs.org/zh-cn/

#element-ui : ui组件
http://element.eleme.io/#/zh-CN/component/installation

#axios ：网络请求
https://www.npmjs.com/package/axios
