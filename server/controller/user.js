/**
 * Created on 2017/6/22.
 */

'use strict'

const User = require('../models/user')

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
/**
 * 加盐加密
 * @param password {string} 原始密码
 * @return hash {object} 加密密码
 * @author gh
 */
var encrypt = async (password) => {
  var salt = await bcrypt.genSaltSync(SALT_WORK_FACTOR)
  var hash = await bcrypt.hashSync(password, salt)
  console.log('mylog', salt, 'salt')
  console.log('mylog', hash, 'hash')
  return hash
}

/**
 * 密码对比
 * @param password {string} 原始密码
 * @param hash {string} 加密密码
 * @return res {boolean} 比对结果 true:密码匹配 | false:密码不匹配
 * @author gh
 */
var validate = async (password, hash) => {
  var res = await bcrypt.compareSync(password, hash)
  return res
}

//基础页面
exports.showBasePage = async (ctx, next) => {
  ctx.render('base.html', {
    title: 'Welcome'
  })
}

//用户注册
exports.userSignup = async (ctx, next) => {
  let body = ctx.request.body
  let tel = body.tel
  let password = body.password
  let checkPass = body.checkPass
  let userData

  if (password !== checkPass) {
    ctx.response.body = {
      code: 0,
      data: null,
      msg: '两次输入的密码不一致'
    }
    return;
  }

  try {
    userData = await User.findOne({tel: tel});

    if (userData !== null) {
      ctx.response.body = {
        code: 0,
        data: null,
        msg: '该账号已注册'
      }
      return;
    }

    //加密密码
    password = await encrypt(password);

    let user = new User({
      tel: body.tel,
      password: password
    })
    //保存到数据库
    userData = await user.save()

    ctx.response.body = {
      code: 1,
      data: userData,
      msg: '注册成功'
    }

  } catch (err) {
    console.log('mylog', err)
  }
}

//用户登录
exports.userSignin = async (ctx, next) => {
  let body = ctx.request.body
  let tel = body.tel
  let password = body.password

  console.log('mylog', body);

  try {
    let userData = await User.findOne({tel: tel});

    if (userData === null) {
      ctx.response.body = {
        code: 0,
        data: null,
        msg: '不存在该账号'
      }
      return;
    }

    let isPassWord = await validate(password, userData.password);

    console.log('mylog', isPassWord);

    if (isPassWord === false) {
      ctx.response.body = {
        code: 0,
        data: null,
        msg: '您输入的密码不正确'
      }
      return;
    }

    ctx.response.body = {
      code: 1,
      data: userData,
      msg: '登录成功'
    }

  } catch (err) {
    console.log('mylog', err)
  }
}
