'use strict';

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

/**
 * 骆驼化以 - 字符分隔的字符串。
 * @param name
 * @returns {string}
 */
export const camelCase = (name) => {
  return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};


/**
 * 从一个给定的数组arr中,随机返回1个
 * @returns {*}
 **/
export const randomElemnt = (array) => {
  let len = 0;
  if (array.length === len) {
    throw new Error('the array is empty');
  }
  return array[Math.floor(Math.random() * array.length)];
};


/**
 * 判断是否是jpg
 * @return {Boolean}
 **/
export const isJpg = (str) => {
  return /\.jpe?g$/.test(str);
};

/**
 * 判断是否是png
 * @return {Boolean}
 **/
export const isPng = (str) => {
  return /\.png$/.test(str);
};

/**
 * 判断是否是指定类型的图片
 * @param file 文件
 * @param $message element-ui提示框对象
 * @return {Boolean}
 **/
export const isTypeImage = (file, $message) => {
  const isImage = isJpg(file.name) || isPng(file.name);
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    $message.error('上传图片只能是 JPG 或者 PNG 格式!');
  }
  if (!isLt2M) {
    $message.error('上传图片大小不能超过 2MB!');
  }
  return isImage && isLt2M;
};


/**
 * 检测数组中的对象属性是否等于给定的对象属性
 * @param {Array} arr
 * @param {Object} obj
 * @param {String} attr
 * @return {Number}
 **/
export const indexOfByAttr = (arr, obj, attr) => {
  let i = arr.length;
  while (i--) {
    if (arr[i] && arr[i][attr] === obj[attr]) {
      return i;
    }
  }
  return -1;
};

// export const indexOfByAttr = (arr, obj , attr) => {
//   let i = arr.length;
//   while (i--) {
//
//     if (Array.isArray(obj)) {
//       for (let n = 0, len = obj.length; n < len; n++) {
//         if (arr[i][attr] === obj[n][attr]) {
//           return i;
//         }
//       }
//     }
//
//     if (arr[i] && arr[i][attr] === obj[attr]) {
//       return i;
//     }
//   }
//   return -1;
// };

/**
 * 数组去重
 * @param {Array} arr
 * @return {Array}
 **/
export const unique = (arr) => {
  return Array.from(new Set(arr));
};


/**
 * 切换数组
 * @param {Array}  array       要操作的数组
 * @param {string} indexOfAttr 对象对比的属性值
 * @param {Array}  currArray   当前数组
 * @param {Array}  newArray    新数组
 */
export const toggleArray = (targetArray, indexOfAttr, currArray, newArray) => {
  if (Array.isArray(targetArray) === false) {
    throw new Error('确保 targetArray 是一个数组');
  }
  if (targetArray.length === 0) {
    return;
  }

  targetArray.forEach((item) => {
    let index = indexOfByAttr(currArray, item, indexOfAttr);

    if (index !== -1) {
      currArray.splice(index, 1);
    }

    if (newArray) {
      newArray.push(item);
    }
  });
};


/**
 * 日期格式化
 * @param date       //日期
 * @param fmt        //格式规则 'yyyy-M-d'  'yyyy-MM-dd'  'yyyy-MM-dd hh:mm:ss'
 * @returns {String}
 */
export const dateFormat = (date, fmt) => {
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
/**
 * 减去前days天的返回的日期
 * @param {Data} date 日期
 * @param {days} days 减去days天
 * @returns 计算前days天的日期
 */
export const dateOperator = (date, days) => {
  date = date.replace(/-/g, '/'); //更改日期格式
  let times = new Date(date);
  times = times.valueOf();
  times = times - days * 24 * 60 * 60 * 1000;
  times = new Date(times);

  let y = times.getFullYear();
  let m = times.getMonth() + 1;
  let d = times.getDate();
  if (m <= 9) {
    m = '0' + m;
  }
  if (d <= 9) {
    d = '0' + d;
  }
  let cdate = y + '-' + m + '-' + d;
  return cdate;
};


/**
 * 裁剪文本 ， 加省略号
 * @param text     文本
 * @param maxLen   文本最大数
 * @returns {String}
 */
export const textEllipsis = (text, maxLen) => {
  if (typeof text !== 'string') {
    throw new Error('请确保 text 为字符串');
  }

  let textLen = text.length || 0;
  maxLen = maxLen || 50;

  if (textLen > maxLen) {
    text = text.substr(0, maxLen) + '...';
  }
  return text;
};

/**
 * 延时执行函数 ， 可以分批进行
 * @param ary   一个数组队列
 * @param fn    回调函数
 * @param count 多少个一批
 * @param waitTime 下一次执行的时间
 **/
export const timeChunk = (ary, fn, count, waitTime) => {
  //检测类型
  if (Array.isArray(ary) !== 'array') {
    throw Error('请确保 ary 是一个数组');
  }

  let timer;
  //开始执行
  let start = () => {
    for (let i = 0; i < Math.min(count || 1, ary.length); i++) {
      let obj = ary.shift();
      if (fn) {
        fn(obj);
      }
    }
  };

  return function () {
    timer = setInterval(() => {
      if (ary.length === 0) { // 如果全部节点都已经被创建好
        return clearInterval(timer);
      }
      start();
    }, waitTime || 200);
  };
};
