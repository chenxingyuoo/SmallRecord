'use strict';

/**
 * 整个项目的过滤器
 * @param time
 * @returns {*}
 */
export const timeToNow = (time) => {
  const t = parseFloat(new Date - new Date(time)) / 1000;
  let str;
  if (t) {
    if (t > 60 && t < 3600) {
      str = `${parseInt(t / 60.0, 10)}分钟前`;
    } else if (t >= 3600 && t < 86400) {
      str = `${parseInt(t / 3600.0, 10)}小时前`;
    } else if (t >= 86400 && t < 86400 * 30) {
      str = `${parseInt(t / 86400.0, 10)}天前`;
    } else if (t >= 86400 * 30 && t < 86400 * 365) {
      str = `${parseInt(t / (86400.0 * 30), 10)}个月前`;
    } else if (t >= 86400 * 365) {
      str = `${parseInt(t / (86400.0 * 365), 10)}年前`;
    } else {
      str = `${parseInt(t, 10)}秒前`;
    }
  }
  return str;
};

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
    }
  }
  return fmt;
}

