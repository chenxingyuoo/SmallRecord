# 小记录

> 小记录，博客 O(∩_∩)O~

前端 : vue2 + vue-router2 + vuex2 + axios + element-ui
后端 : koa2 + mongoose

[github](https://github.com/chenxingyuoo/SmallRecord)

如果觉得有用的话可以给个star 😊

## 应用截图

### 登录注册页面

![](https://github.com/chenxingyuoo/markdown-image/blob/master/smallRecord/base.jpeg?raw=true)

### pc端首页

![](https://github.com/chenxingyuoo/markdown-image/blob/master/smallRecord/pc.jpeg?raw=true)

### 后台管理系统

![](https://github.com/chenxingyuoo/markdown-image/blob/master/smallRecord/admin.jpeg?raw=true)

## 构建安装程序 (开发环境)

### 前端

条件: Node.js版本(>=4.x), npm版本3+.

``` bash
cd app/

# 安装依赖包
npm install

# 开启服务 ， 热更新监听
npm run dev

# 打包
npm run build
```

### 后端

条件: Node.js版本(>=v7.6.0) mongodb(>=v2.6.0)

``` bash
cd server/

# 安装依赖包
npm install

# mongodb 新建数据库 : smallRecord
开启mongodb服务

# 开启服务
npm run start
```

> 开发环境访问链接 ：
>
> 后台管理系统 ：http://localhost:3030/module/admin.html#/index
> 登录注册页 ：http://localhost:3030/module/base.html
> pc端首页 ： http://localhost:3030/module/pc.html#/all


## 构建安装程序 (生产环境)

前端
``` bash
cd app/

# 打包
npm run build
```

后端

条件 : 需要安装 pm2 https://www.npmjs.com/package/pm2

``` bash
cd server/

# 安装依赖包
npm install

# mongodb 新建数据库 : smallRecord
开启mongodb服务

# 部署
npm run build 或者 npm run pm2

```

> 生产环境访问链接 ：
>
> 后台管理系统 ：http://localhost:3000/module/admin.html/#index
> 登录注册页 ：http://localhost:3000/
> pc端首页 ： http://localhost:3000/module/pc.html#/all

## Todos

文章的编辑与展示 使用 markdown 语法

* ~~编辑文章~~
* ~~文章分类~~
* ~~更新文章~~
* ~~展示文章~~
* ~~删除文章~~
* ~~查看文章~~


