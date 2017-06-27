/**
 * Created on 2017/6/15.
 */

'use strict'

const path = require('path')
const utils = require('../utils')
const fs = require('fs')
const News = require('../models/news')

//保存文章 / 更新文章
exports.saveNews = async (ctx, next) => {
  const fields = ctx.request.body.fields
  const file = ctx.request.body.files.file
  const id = fields.id

  let newPath
  if (file) {
    let tempPath = file.path
    let ext = path.extname(file.name)
    newPath = path.join('public/upload', parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + ext)
    let absolutePath = path.join(__dirname, '..', newPath)

    let stream = fs.createWriteStream(absolutePath)//创建一个可写流
    fs.createReadStream(tempPath).pipe(stream)//可读流通过管道写入可写流
  } else if (fields.cover) {
    newPath = fields.cover
  }

  const curDate = new Date()
  let newsObj = {
    title: fields.title,
    cover: newPath,
    desc: fields.desc,
    content: fields.content,
    editValue: fields.editValue,
    category : '全部,' + fields.category,
    tags : fields.tags,
    updateAt: utils.dateFormat(curDate, 'yyyy-MM-dd hh:mm:ss'),
  }

  try {
    //更新
    if (id !== 'undefined') {

      let article = await News.findOne({_id: id})

      article = Object.assign(article, newsObj)

      await article.save()

      ctx.response.body = {
        code: 1,
        data: article,
        message: '更新成功'
      }

    } else {

      newsObj.createAt = utils.dateFormat(curDate, 'yyyy-MM-dd hh:mm:ss')

      const news = new News(newsObj)

      //执行数据库保存操作
      let data = await news.save()

      ctx.response.body = {
        code: 1,
        data: data,
        message: '创建成功'
      }

    }
  } catch (err) {
    console.log(err, '')
  }

}

//获取文章列表
exports.getNewsList = async (ctx, next) => {
  let query = ctx.request.query
  let categoryName = query.categoryName;
  let page = Number.parseInt(query.page)
  let pageSize = Number.parseInt(query.pageSize)
  let currentPage = (Number(page) - 1) * pageSize
  let isFirstPage = page === 1

  try {

    //找到指定分类的文章
    let allData = await News.find({$text:{$search: categoryName}})
    let data = await News.find({$text:{$search: categoryName}}).sort({updateAt: -1}).limit(pageSize).skip(currentPage)

    let totalPage = Math.ceil((allData.length) / pageSize)
    let isLastPage = page === pageSize

    ctx.response.body = {
      code: 1,
      data: {
        firstPage: isFirstPage,
        lastPage: isLastPage,
        pageSize: pageSize,
        currentPage: page,
        totalPage: totalPage,
        list: data
      },
      message: '获取成功'
    }

  } catch (err) {
    console.log(err)
  }
}

//获取一篇文章
exports.getOneNews = async (ctx, next) => {
  let query = ctx.request.query
  let id = query.id

  try {
    if (!id) {
      return
    }

    let data = await News.findOne({_id: id})

    ctx.response.body = {
      code: 1,
      data: data,
      message: '获取文章成功成功'
    }

  } catch (err) {
    console.log('mylog', err)
  }
}

//删除文章
exports.delOneNews = async (ctx, next) => {
  let body = ctx.request.body
  let id = body.id
  try {

    if (!id) {
      return
    }

    let data = await News.remove({'_id': id})

    ctx.response.body = {
      code: 1,
      data: [
        data
      ],
      message: '删除成功'
    }

  } catch (err) {
    console.log(err)
  }
}





