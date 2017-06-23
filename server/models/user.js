/**
 * Created on 2017/6/22.
 */

'use strict'

const mongoose = require('../db').mongoose;

const UserSchema = new mongoose.Schema({
  token : {
    type: String,
    default: ''
  },
  tel: {
    type: Number,
    default: null
  },
  password: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Number,
    default: 0
  },
  createAt: {
    type : String,
    default : Date.now()
  },
  updateAt: {
    type : String,
    default : Date.now()
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;