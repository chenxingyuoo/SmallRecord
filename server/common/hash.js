/**
 * Created on 2017/6/24.
 */

'use strict';

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

/**
 * 加盐加密
 * @param  original {string} 原始值
 * @return hash {object} 加密值
 * @author gh
 */
exports.encrypt = async (original) => {
  const salt = await bcrypt.genSaltSync(SALT_WORK_FACTOR)
  const hash = await bcrypt.hashSync(original, salt)
  console.log('mylog', salt, 'salt')
  console.log('mylog', hash, 'hash')
  return hash
}

/**
 * 验证
 * @param original {string} 原始值
 * @param hash {string} 加密值
 * @return res {boolean} 比对结果 true:密码匹配 | false:密码不匹配
 * @author gh
 */
exports.validate = async (original, hash) => {
  const res = await bcrypt.compareSync(original, hash)
  return res
}
