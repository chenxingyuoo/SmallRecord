/**
 * Created by chenxingyu on 2017/1/10.
 */
const mongoose = require('../db').mongoose

const newsSchema = new mongoose.Schema({
  title: {
    type : String,
    default : ''
  },
  cover: {
    type : String,
    default : ''
  },
  desc: {
    type : String,
    default : ''
  },
  content: {
    type : String,
    default : ''
  },
  editValue: {
    type : String,
    default : ''
  },
  category: {
    type : String,
    index : 'text',     //对 category 字段创建索引
    default : ''
  },
  tags: {
    type : String,
    default : ''
  },
  createAt: {
    type : String,
    default : ''
  },
  updateAt: {
    type : String,
    default : ''
  },
})

const News = mongoose.model('News', newsSchema)

module.exports = News