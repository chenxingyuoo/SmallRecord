import axios from 'axios';
import * as qs from 'qs';

axios.defaults.baseURL = 'http://localhost:3000';

const MIN_RES_CODE = 200;
const MAX_RES_CODE = 300;
const CONTENT_TYPE = 'application/x-www-form-urlencoded';

const SUCCESS_CODE = 1;

//请求状态码是否ok
const isOk = (status) => {
  if (status >= MIN_RES_CODE && status <= MAX_RES_CODE) {
    return true;
  }
  return false;
};

//网络请求捕获错误
const requireCatch = (res) => {
  if ((typeof res === 'number' && !isOk(res)) || (res.response && !isOk(res.response.status))) {
    alert({ message: '系统出现错误了~' + res });
  }
  if (res.code && res.code !== SUCCESS_CODE) {
    alert({ message: res.message });
  }
  return Promise.reject(res);
};

/**
 * get请求
 * @param  {Object}   opts   请求对象 包括 axios 的配置参数
 * @return {Promise}         Promise
 */
export const get = (opts = {}) => {
  let setting = {
    url : '',
    method: 'GET',
    params: {}
  };

  //合并对象
  setting = Object.assign(setting, opts);

  return axios(setting)
    .then((res) => {
      if (res.status < MIN_RES_CODE || res.status > MAX_RES_CODE) {
        return Promise.reject(new Error(res.status));
      }

      if (res.data.code === SUCCESS_CODE) {
        return res.data;
      }
      return Promise.reject(res.data);
    }).catch((res) => {
      return requireCatch(res);
    });
};

/**
 * post请求
 * @param  {Object}   opts   请求对象 包括 axios 的配置参数
 * @return {Promise}         Promise
 */
export const post = (opts = {}) => {
  let setting = {
    url : '',
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE
    },
    data: {}
  };

  //合并对象
  setting = Object.assign(setting, opts);
  //data参数序列化
  setting.data = qs.stringify(opts.data);

  return axios(setting)
    .then(res => {

      if (!isOk(res.status)) {
        return Promise.reject(res.status);
      }

      if (res.data.code === SUCCESS_CODE) {
        return res.data;
      }

      return Promise.reject(res.data);

    }).catch(res => {
      return requireCatch(res);
    });
};

/**
 * 文件上传
 * @param  {String} url    api地址
 * * @param  {Object}   opts   请求对象 包括 axios 的配置参数
 * @return {Promise}        Promise
 */
export const upload = (opts = {}) => {
  let setting = {
    url: '',
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE
    },
    data: {},
    transformRequest: [function (data) {
      let fd = new FormData();

      for (let key in data) {
        fd.append(key, data[key]);
      }

      return fd;
    }]
  };

  //合并对象
  setting = Object.assign(setting, opts);

  return axios(setting).then((res) => {
    if (!isOk(res.status)) {
      return Promise.reject(res.status);
    }

    if (res.data.code === SUCCESS_CODE) {
      return res.data;
    }
    return Promise.reject(res.data);

  }).catch(res => {
    return requireCatch(res);
  });
};

