/**
 * Created on 2017/6/22.
 */

'use strict'

const User = require('../models/user')

const hash = require('../common/hash')

const jwt = require('jsonwebtoken')
const config = require('../config')

//是否登录
let isSignin = false

//用户注册
exports.userSignup = async (ctx, next) => {
  let body = ctx.request.body
  let tel = body.tel
  let password = body.password
  let checkPass = body.checkPass
  let user

  if (password !== checkPass) {
    ctx.response.body = {
      code: 0,
      data: null,
      message: '两次输入的密码不一致'
    }
    return
  }

  try {
    user = await User.findOne({tel: tel})

    if (user !== null) {
      ctx.response.body = {
        code: 0,
        data: null,
        message: '该账号已注册'
      }
      return
    }

    //加密密码
    password = await hash.encrypt(password)

    let userModel = new User({
      tel: body.tel,
      password: password
    })

    //保存到数据库
    user = await userModel.save()

    ctx.response.body = {
      code: 1,
      data: user,
      message: '注册成功'
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

  try {
    let user = await User.findOne({tel: tel})
    if (user === null) {
      ctx.response.body = {
        code: 0,
        data: null,
        message: '不存在该账号'
      }
      return
    }

    //验证密码
    let isPassWord = await hash.validate(password, user.password)
    // let isPassWord = true
    if (isPassWord === false) {
      ctx.response.body = {
        code: 0,
        data: null,
        message: '您输入的密码不正确'
      }
      return
    }

    let userId = user._id

    user.token = jwt.sign({
      userId : userId
    } , config.secret, {
      expiresIn: 60 * 60   // 1小时过期
    })

    user = await user.save()

    isSignin = true

    ctx.response.body = {
      code: 1,
      data: user,
      token: user.token,
      message: '登录成功'
    }

  } catch (err) {
    console.log('mylog', err)
  }
}

//用户退出登录
exports.userSignout = async (ctx, next) => {
  let body = ctx.request.body
  let userId = body.userId

  try {
    let user = await User.findOne({_id: userId})

    if (user === null) {
      ctx.response.body = {
        code: 0,
        data: null,
        message: '该用户不存在'
      }
      return
    }

    isSignin = false

    ctx.response.body = {
      code: 1,
      data: user,
      message: '退出登录成功'
    }
  } catch (err) {
    console.log('mylog', err)
  }
}

/**
 * 验证是否登录了
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.verifyLogin = async (ctx, next) => {
  let token = ctx.request.query.token || ctx.request.body.token || ctx.request.body.fields.token || ctx.request.get('authorization')

  const returnNotLogin = () => {
    ctx.response.body = {
      code : 2,
      data : null,
      message : '该用户还没登录'
    }
  }

  try {
    if (isSignin === false) {
      returnNotLogin()
      return
    }

    let profile = await jwt.verify(token, config.secret)
    if (profile !== null) {
      await next()
    }
  } catch (err) {
    if (err) {
      isSignin = false
      returnNotLogin()
    }
  }
}

/**
 * 验证权限 1 是超级管理员 0 不是超级管理员
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.verifyAuthority = async (ctx, next) => {
  let token = ctx.request.query.token || ctx.request.body.token || ctx.request.body.fields.token || ctx.request.get('authorization')

  let user = await User.findOne({token: token})

  if (user.isAdmin !== 1) {
    ctx.response.body = {
      code : 0,
      data : null,
      message : '操作失败,因为您不是管理员'
    }
    return
  }

  await next()

}
