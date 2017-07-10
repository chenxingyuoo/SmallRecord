/**
 * Created by chenxingyu on 2017/1/10.
 */

/**
 * 日期格式化
 * @param date       //日期
 * @param fmt        //格式规则 'yyyy-M-d'  'yyyy-MM-dd'  'yyyy-MM-dd hh:mm:ss'
 * @returns {String}
 */
exports.dateFormat = (date, fmt) => {
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }

  return fmt;
};

exports.isPc = (userAgent) => {
  userAgent = userAgent.toLowerCase();
  if (userAgent.match(/iphone|android|ipad|ipod|symbianos|windows phone|micromessenger/)) {
    return false;
  }
  else {
    return true;
  }
}

